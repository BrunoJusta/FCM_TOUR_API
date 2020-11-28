const utilities = require('../utilities/utilities.js')
const user = require("../models/users.js");
const bcrypt = require('bcrypt');

const login = (req, res) => {

    user.find({email: req.body.email}, function (err, user) {
        if (err) {
            res.status(400).send(err); 
        }

        if(user.length > 0) {

            bcrypt.compare(req.body.password, user[0].password).then(function(result) {
                if(result) {
                    utilities.generateToken({user: req.body.email}, (token) => {
                        res.status(200).json(token); 
                    })
                } else {
                    res.status(401).send("Not Authorized"); 
                }
            });

           
        } else {
            res.status(401).send("Not Authorized"); 
        }
       
    })
} 

const register = (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            
            const userToCreate = new user({ username: req.body.username, password: hash, email: req.body.email, points: 0, img: "" });

            user.find({email: req.body.email}, function (err, user) {
                if (err) {
                    res.status(400).send(err); 
                }
        
                if(user.length > 0) {
                    res.status(406).send("Duplicated User"); 
                } else {
                    userToCreate.save(function (err, newUser) {
                        if (err) {
                            res.status(400).send(err); 
                        }
                        res.status(200).json("Registered User"); 
                    })
                }
            })
        });
    });
} 


const getUsers = (req, res) => {
    user.find(function (err, result) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(result); 
    })
}


exports.login = login; 
exports.register = register; 
exports.getUsers = getUsers;