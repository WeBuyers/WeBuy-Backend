const express = require('express');
const router = express.Router();
const db = require('../db.js');
const simulatedAnnealing = require('simulated-annealing');
const sequelize = db.sequelize;
const itemlist = db.itemlist;
const store = db.store; 

//return a list of all items that can be searched
router.get("/allitem", async function (req, res) {
    let items = await itemlist.findAll({
        attributes: ['itemname', 'picturelink']         
    })
    console.log(items);
    if (items !== null) {
        res.json(items.map((item)=>item.toJSON()));
    } else {
        res.json('Not found');
    }
    
});

//search an array of items according to the keyword and find the stores that contains this item and 
//give back an array of stores according to price and distance 
router.get("/item", async function (req, res) {
    const keyword = req.query.name;
    const current_lat = req.query.latitude;
    const current_lon = req.query.longitude;
    let items = await itemlist.findAll();
    items = items.filter((item) => (
        item.itemname.toLowerCase().includes(keyword.toLowerCase())
    ));

    items = items.map((item)=>{
        return item.dataValues;
    });

    if(items.length < 1){
        console.log('Not Found');
        res.status(404).send("Not Found");
    }else{
        let promise = [];
        for(let i = 0; i < items.length; i++){
            let newPromise = store.findOne({where:{id: items[i].storeid}})
                .then(data =>{
                    if(data.length !== 0){
                        const store_matched = data.dataValues;
                        items[i].distance = getDistanceFromLatLonInKm(current_lat,current_lon,store_matched.latitude,store_matched.longitude);
                        console.log(items[i]);
                    }
                }).catch(err=>{console.error(err.message)})
            promise.push(newPromise);
        }

        await Promise.all(promise).then();

    }

    items.sort((a, b) => ((0.4*a.price+0.6/a.distance) - (0.4*b.price+0.6/b.distance)));
    res.json(items);
    })

//search a list of items and return the most optimized route 
router.post("/itemlist", async function (req, res) {
    const items = req.body.items;
    const current_lat = req.body.latitude;
    const current_lon = req.body.longitude;
    let store_destination = []
   
    //search the items and their corresponding stores 
    for(let i = 0; i<items.length; i++) {
        console.log(items[i]);
        let item = await itemlist.findOne({where:{itemname: items[i]}});
        let store_wanted = await store.findOne({where:{id: item.storeid}}); 
        store_destination.push([store_wanted,item]); 
    }

     var size = items.length;
        var t_init = 1000;
        var t_end = 1;
        const coolingrate = 0.97;
        let link = Math.pow(size, 2); 
        let original_sol, length1, length2, dl, r, r1,r2,size1,size2,t; 
        let new_sol = store_destination.slice();

        //use simulated annealing to calculate the most optimized route 
        while(t_init > t_end){
            for(let i = 0; i<link; i++){
                original_sol = new_sol.slice();
                r1 = Math.random();
                r2 = Math.random();
                size1 = parseInt(size*r1, 10);
                size2 = parseInt(size*r2, 10);
                t = new_sol[size2];
                new_sol[size2] = new_sol[size1];
                new_sol[size1] = t; 
                length1 = calculateTotalDistance(original_sol, current_lat, current_lon);
                length2 = calculateTotalDistance(new_sol, current_lat, current_lon);
                dl = length2 - length1; 
                if(dl >= 0){ //if the new path is longer 
                    r = Math.random(); 
                    if(Math.exp((-1)*dl/t_init) <= r) {
                        new_sol = original_sol.slice(); 
                    }
                }
            }
            t_init*=coolingrate; 
        }

    store_destination = new_sol;
    let min_distance = calculateTotalDistance(new_sol, current_lat, current_lon); 
    //show the most optimized route with the item information 
    res.json(store_destination);
})

//calculate the distance in km according to latitude and longitude 
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

//calculate the total distance from a location and go to each store in the list 
//and go back to current loctaion 
function calculateTotalDistance(stores, depLat, depLon) {
    depLat = parseFloat(depLat);
    depLon = parseFloat(depLon); 
    let length = getDistanceFromLatLonInKm(stores[0][0].latitude, stores[0][0].longitude, depLat, depLon) + 
    getDistanceFromLatLonInKm(stores[stores.length-1][0].latitude, stores[stores.length-1][0].longitude, depLat, depLon); 
    for(let i = 0; i<stores.length-1; i++) {
        length += getDistanceFromLatLonInKm(stores[i][0].latitude, stores[i][0].longitude, stores[i+1][0].latitude, stores[i+1][0].longitude); 
    }
    return length; 
}


module.exports = router;


