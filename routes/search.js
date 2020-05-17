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

    let items = await itemlist.findAll()
    items = items.filter((item) => (
        item.itemname.toLowerCase().includes(keyword.toLowerCase())
    ));
    items.sort((a, b) => (a.price - b.price)); 
    
    if(items.length < 1){
        console.log('Not Found');
        res.json('Not found');
    }else{
    let store_id_list = [];

    items.forEach(element => {
        store_id_list.push(element.storeid); 
    });

    let stores = [];

    store_id_list.forEach((storeid) => {
        const store_matched = store.findOne({where: {id: storeid}});
        stores.push(store_matched);
    });

    stores = await Promise.all(stores);

    let distance = []

    stores.forEach(element => {
        distance.push(calculate_distance(current_lat, element.latitude,current_lon, element.longitude)); 
        element.distance = calculate_distance(current_lat, element.latitude,current_lon, element.longitude); 
    });

    stores.forEach(element => {
        console.log(element.toJSON()); 
    })
    
    res.json(items.map((item) => item.toJSON()));
}})


//search a list of items
router.post("/itemlist", async function (req, res) {
    const items = req.body.items;
    {/*todo*/}
})

function calculate_distance(lat1, lat2, lon1, lon2) {
    return Math.sqrt((lat1-lat2)*(lat1-lat2)+(lon1-lon2)*(lon1-lon2)); 
}

module.exports = router;
