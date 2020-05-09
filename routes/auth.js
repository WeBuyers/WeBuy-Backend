const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('WeBuy API 1.0');
});

router.post('/login', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        if(username === "usr" && password === "123"){
            res.status(200).send("logged in...");
        }else{
            res.status(400).send("Invalid username and password!");
        }
        res.end();
    }else{
        res.status(400).send("Please enter your username and password.");
        res.end();
    }
});

module.exports = router;