const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const db = require('../db.js');
const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('User', {
    user_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {freezeTableName: true, timestamps: false});

sequelize.sync();

let counter;
User.count({
    col: 'user_id',
})
    .then(count => {
        console.log(count);
        counter = count;
    }).catch((err)=>{console.error(err.message)});


router.get('/', function(req, res) {
    res.send('WeBuy API 1.0');
});

router.post('/login', function(req, res) {
    sequelize.sync();
    let auth = req.headers['x-access-token'] || req.headers['authorization'];
    if(auth && auth.startsWith('Bearer ')){
        auth = auth.slice(7, auth.length);
        jwt.verify(auth, 'webuysecret', (err, decoded)=>{
            if(err){
                return res.status(400).json({
                    success: false,
                    message: "Token is not valid or expired"
                })
            }else{
                let user = User.findOne({where: username});
                email = user.email;
                return res.status(200).json({
                    success: true,
                    user_id: decoded.user_id,
                    username: username,
                    email: email,
                    message: "Token valid and logged in!"
                })
            }
        })
    }

    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(400).send("Please enter your username and password.");
        res.end();
    }

    User.findAll({
        attributes: ['user_id', 'username', 'email'],
        where: {
            username: username,
            password: password
        },
    }).then(user => {
        console.log(user);
        if(user.length!==0){
            let token = jwt.sign({username: username, user_id: user[0].dataValues.user_id},
                'webuysecret',
                {expiresIn: '24h'}
                );
            res.status(200).json({
                success: true,
                message: "Successfully logged in!",
                user_id: user[0].dataValues.user_id,
                token: token,
                email: user[0].dataValues.email,
            });
            console.log("Successfully Login!");
        }else {
            res.status(400).send("Invalid username and password!");
        }
    }).catch(err => {
        console.error(err.message);
    })
});

router.post('/signup', function (req, res) {
    sequelize.sync();
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    User.findAll({
        attributes: ['username'],
        where:{
            username: username
        }
    }).then(user => {
        if(user.length!==0){
            res.status(201).send("user is already existed");
        }else{
            User.create({
                username: username,
                password: password,
                email: email,
                user_id: counter
            }).then(()=>{
                res.status(200).json({
                    success: true,
                    message: `User ${counter} has been added.`,
                    user_id: counter
                });
                console.log(`User ${counter} has been added.`);
                counter++;
            });
        }
    }).catch((err)=>{console.error(err.message)});
});

module.exports = router;