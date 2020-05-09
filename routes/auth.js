const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./webuy.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log("Connected to sqlite db...");
    }
});

let counter;
db.get(`SELECT COUNT() AS user_count FROM User`, (err, row)=>{
    if(err){
        console.error(err.message);
    }else{
        counter = row.user_count;
        console.log(counter);
    }
})

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
    let sql = `SELECT DISTINCT username, email FROM User WHERE username = ? AND password = ?`;
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

router.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    let find = `SELECT DISTINCT username FROM User WHERE username = ?`;
    let add = `INSERT INTO User(user_id, username, email, password) VALUES(?, ?, ?, ?)`;
    db.get(find, [username], (err, row)=>{
        if(err){
            return console.log(err.message);
        }
        if(!row){
            console.log("Adding the account into db...");
            db.run(add, [counter, username, email, password], (err)=>{
                if(err){
                    return console.log(err.message);
                }else{
                    res.status(200).send(`User ${counter} has been added.`);
                    console.log(`User ${counter} has been added.`);
                    counter++;
                }
            })
        }else{
            res.status(201).send("user is already existed");
        }
    })
});

module.exports = router;