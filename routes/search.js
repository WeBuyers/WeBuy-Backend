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


(async () => {
    await sequelize.sync();
    const a = await itemlist.create({
        itemname: 'apple',
        picturelink: "good"
    });
console.log(a.toJSON());
})(); 

(async () => {
    await sequelize.sync();
    const a = await itemlist.create({
        itemname: 'pear',
        picturelink: "bad"
    });
console.log(a.toJSON());
})(); 

(async () => {
    await sequelize.sync();
    const a = await itemlist.create({
        itemname: 'banana',
        picturelink: "git"
    });
console.log(a.toJSON());
})();

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

//search an item
router.get("/item", async function (req, res) {
    const item = req.query.name;

    const item_wanted = await itemlist.findOne({where: {itemname: item}});
    if(item_wanted === null){
        console.log('Not Found');
        //send this to front end 
        res.json('Not found');
    }else{
        console.log(item_wanted.toJSON()); 
        //send this to front end 
        res.json(item_wanted.toJSON());
    }
})

//search a list of items
router.post("/itemlist", async function (req, res) {
    const items = req.body.items;
    {/*todo*/}
})

module.exports = router;