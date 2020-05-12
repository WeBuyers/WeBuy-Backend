const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
   dialect: "sqlite",
   storage: "./webuy.db"
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
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