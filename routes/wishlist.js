const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sequelize = db.sequelize;
const wishlist = db.wishlist;
const itemlist = db.itemlist;
const jwt = require('jsonwebtoken');
module.exports = router;


router.get('/listall', async (req, res, next) => {
    const userid = req.query.user_id;

    if (userid === undefined) {
        res.status(400).send("Cannot find user id.")
        return
    }

    //search the wishlist table
    let items = await wishlist.findAll({
        where: {user_id: userid},
        attributes: ['item_id']
    });
    Promise.all(items);
    if (items !== null) {
        let list = [];
        let result = [];
        for(let i = 0; i < items.length; i++){
            let newPromise = itemlist.findOne({where:{id: items[i].dataValues.item_id}})
                .then(data=> {
                    console.log(data.dataValues.itemname);
                    result.push({name: data.dataValues.itemname, id: data.dataValues.id});
                    //console.log(result);
                })
                .catch(err=>{console.error(err.message)});
            list.push(newPromise);
        }
        await Promise.all(list);
        res.json(result);

    } else {
        res.json([]);
    }

});

router.post('/additem', async (req, res, next) => {

    const user_id = req.body.user_id;
    const item_id = req.body.item_id;

    if (user_id === undefined || item_id === undefined) {
        res.status(400).send("Cannot find user id or item id.")
        return
    }


    // add the wishlist table
    wishlist.findAll({
        attributes: ['user_id', 'item_id'],
        where:{
            user_id: user_id,
            item_id: item_id,
        }
    }).then(items => {
        if(items.length!==0){
            res.status(400).send("Item is already in the wishlist");
        }else{
            wishlist.create({
                user_id: user_id,
                item_id: item_id,
            }).then(()=>{
                console.log(`Item has been added to the wishlist.`);
                res.status(200).send(`Item has been added to the wishlist.`);
            });
        }
    }).catch((err)=>{console.error(err.message)});

});


router.delete('/deleteitem', async (req, res, next) => {
    
    const user_id = req.body.user_id;
    const item_id = req.body.item_id;

    if (user_id === undefined || item_id === undefined) {
        res.status(400).send("Cannot find user id or item id.")
        return
    }

    wishlist.destroy({where: {
        user_id: user_id,
        item_id: item_id,
    }})
    .then((a)=>{
        console.log(`${a} Item has been deleted from the wishlist.`);
        if (a === 0)
            res.status(400).send("No item to delete");
        else
            res.status(204).send('deleted');
    });
});