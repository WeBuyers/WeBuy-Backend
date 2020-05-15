const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
   dialect: "sqlite",
   storage: "./webuy.db"
});

//create the three tables that we need 
const itemlist = sequelize.define('Items',
{
    itemname:{
        type: Sequelize.STRING, 
        allowNull: false
    },
    picturelink: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {freezeTableName: true, timestamps: false});

const store = sequelize.define('Stores',
{
    storename:{
        type: Sequelize.STRING, 
        allowNull: false
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}, {freezeTableName: true, timestamps: false});

const relationship = sequelize.define('Relationships',
{
    itemname:{
        type: Sequelize.STRING, 
        allowNull: false
    },
    store: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {freezeTableName: true, timestamps: false});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ force:true }); 
    })
    .then(()=>
        sequelize.close()
    )

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