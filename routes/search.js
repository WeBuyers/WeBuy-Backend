const express = require('express');
const router = express.Router();
const db = require('../db.js');
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
                        items[i].distance = calculate_distance(current_lat, store_matched.latitude, current_lon, store_matched.longitude);
                    }
                }).catch(err=>{console.error(err.message)})
            promise.push(newPromise);
        }

        await Promise.all(promise).then(()=> console.log(items));

    }

    items.sort((a, b) => ((0.4*a.price+0.6/a.distance) - (0.4*b.price+0.6/b.distance)));
    res.json(items);
    })


//search a list of items
router.post("/itemlist", async function (req, res) {
    const items = req.body.items;
    {/*todo*/}
})

function calculate_distance(lat1, lat2, lon1, lon2) {
    return Math.sqrt((lat1-lat2)*(lat1-lat2)+(lon1-lon2)*(lon1-lon2)); 
}

module.exports = router;
