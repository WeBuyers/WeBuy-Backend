const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sequelize = db.sequelize;
const wishlist = db.wishlist;
const jwt = require('jsonwebtoken');
module.exports = router;


router.use(':username', (req, res, next) => {
    //TODO authentication
    try {
        const username = req.param.username;
        const token = req.cookies.jwt;
        if (username === null || token === null) throw new Error();
        const decoded = jwt.verify(token, 'webuysecret');
        if (decoded.username != username) throw new Error();
    } catch (e) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
})

router.get('/:username', async (req, res, next) => {
    const username = req.params.username;
    //search the wishlist table
    let items = await wishlist.findAll({
        where: {username: username},
        attributes: ['item_id']
    });
    if (items !== null) {
        res.json(items.map(e => e.dataValues.item_id));
    } else {
        res.json([]);
    }

});

router.post('/:username/:item_id', async (req, res, next) => {

    const username = req.params.username;
    const item_id = req.params.item_id;
    // add the wishlist table
    wishlist.findAll({
        attributes: ['username', 'item_id'],
        where:{
            username: username,
            item_id: item_id,
        }
    }).then(items => {
        if(items.length!==0){
            res.status(400).send("Item is already in the wishlist");
        }else{
            wishlist.create({
                username: username,
                item_id: item_id,
            }).then(()=>{
                console.log(`Item has been added to the wishlist.`);
                res.status(201).send(`Item has been added to the wishlist.`);
            });
        }
    }).catch((err)=>{console.error(err.message)});

});


router.delete('/:username/:item_id', async (req, res, next) => {
    
    const username = req.params.username;
    const item_id = req.params.item_id;

    wishlist.destroy({where: {
        username: username,
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