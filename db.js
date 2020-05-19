const Sequelize = require('sequelize');

const sequelize = new Sequelize({
   dialect: "sqlite",
   storage: "webuy.db"
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
    },
    storeid:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type:Sequelize.DOUBLE,
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
}, {timestamps: false});

/*
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({}); 
    }).then(async () => {
        await store.create({
            storename:"Target Westwood",
            latitude: 34.0627963,
            longitude: -118.4460309,
            id: 1
        });
        await store.create({
            storename:"Marukai",
            latitude:34.0479293,
            longitude: -118.4662372,
            id: 6
        });
        await store.create({
            storename:"Ralphs Westwood",
            latitude:34.062651,
            longitude: -118.4461308,
            id: 3
        });
        await store.create({
            storename:"Nijiya Markey Sawtelle",
            latitude:33.9197299,
            longitude: -118.4810098,
            id: 4
        });
        await store.create({
            storename:"Trader Joes Westwood",
            latitude:34.0622696,
            longitude: -118.4459629,
            id:2
        });
        await store.create({
            storename:"Whole Food",
            latitude:34.0664094,
            longitude: -118.4498484,
            id: 5
        });
        await store.create({
            storename:"Santa Monica Kosher Market",
            latitude:34.0560661,
            longitude: -118.4573262,
            id: 7
        });
        await store.create({
            storename:"Smart & Final",
            latitude:34.0531936,
            longitude: -118.4721664,
            id: 8
        });
        await store.create({
            storename:"Eden L Market",
            latitude:34.0552821,
            longitude: -118.4737349,
            id: 9
        });
        await store.create({
            storename:"Tochal Market",
            latitude:34.0604977,
            longitude: -118.4559502,
            id: 10
        })
    })

*/

exports["sequelize"] = sequelize
exports["itemlist"] = itemlist
exports["store"] = store
