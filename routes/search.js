const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//connecting to sqlite database
let db = new sqlite3.Database('./webuy.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log("Connected to sqlite db...");
    }
});

//return a list of all items that can be searched
router.get("/allitem", function (req, res) {
    {/*TODO*/}
});

//search an item
router.get("/item", function (req, res) {
    const item = req.query.name;
    {/*TODO*/}
})

//search a list of items
router.post("/itemlist", function (req, res) {
    const items = req.body.items;
    {/*TODO*/}
})

module.exports = router;