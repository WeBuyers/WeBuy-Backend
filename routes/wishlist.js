const express = require('express');
const router = express.Router();
const db = require('../db.js');
const sequelize = db.sequelize;
const wishlist = db.wishlist;;

router.use(':username', (req, res, next) => {
    //TODO authorize
    
    next();
})

router.get('/:username', (req, res, next) => {
    const username = req.param.username;
    //search the wishlist table
});

router.post('/:username/:item_id', (req, res, next) => {
    const username = req.param.username;
    const item_id = req.param.item_id;
    // add the wishlist table
});

router.delete('/:username/:item_id', (req, res, next) => {
    
    const username = req.param.username;
    const item_id = req.param.item_id;
    // 
});