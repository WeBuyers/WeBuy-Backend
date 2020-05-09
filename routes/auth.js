const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./webuy.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log("Connected to sqlite db...");
    }
})

let sql = `SELECT DISTINCT username, email FROM User WHERE username = ? AND password = ?`;

router.get('/', function(req, res) {
    res.send('WeBuy API 1.0');
});

router.post('/login', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(400).send("Please enter your username and password.");
        res.end();
    }
    db.get(sql, [username, password], (err, row) =>{
        if(err){
            console.error(err.message);
        }
        if(row){
            res.status(200).send(`logged in... ${row.username}`);
            console.log("Successfully logged in!");
        }else{
            res.status(400).send("Invalid username and password!");
        }
        res.end();
    })
});

module.exports = router;