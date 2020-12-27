const utilities = require('../utilities/utilities.js')
const users = require("../models/users.js");
const firebase = require("../API/firebase.js");
const bcrypt = require('bcrypt');
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;



const register = (req, res) => {
    if(req.body.password == req.body.confPassword){
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
    
                const userToCreate = new users({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    points: 0,
                    img: "",
                    type: 01
                });
    
                users.find({email: req.body.email}, function (err, user) {
                    if (err) {
                        res.status(400).send(err);
                    }
    
                    if (user.length > 0) {
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
    else{
        res.status(406).send("Palavras Passes nao coincidem");
    }
   
}


const getUsers = (req, res) => {
    users.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result);
    })
}








//------------------------------------LOGIN_NORMAL------------------------------------

const login = (req, res) => {
    users.find({email: req.body.email}, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {
            if(user[0].password == "" || user[0].password == null){
                res.status(401).send("Conta não existe");
            }
            else{
                bcrypt.compare(req.body.password, user[0].password).then(function (result) {
                    if (result) {
                        utilities.generateToken({user: req.body.email}, (token) => {
                            res.status(200).json(token);
                        })
                    } else {
                        res.status(401).send("Not Authorized");
                    }
                });
            }
        } else {
            res.status(401).send("Not Authorized");
        }

    })
}

//------------------------------------LOGIN_GOOGLE------------------------------------

const loginGoogle = (validToken, res) => {

    users.find({email: validToken.email}, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {


            users.findOne({email:validToken.email}, function (err, results) {
                if (err) {
                    res.status(400).send(err);
                }
                if (results) {
                    if(user[0].type == 01){
                        results.type = 04
                            results.markModified("type")
                            results.save();
                            res.status(200).json("Logged");
                    } 
                    else if(user[0].type == 03){
                        user[0].type = 07
                        results.markModified("type")
                        user.save();
                        res.status(200).json("Logged");
                    }else if(user[0].type == 05){
                        user[0].type = 06
                        results.markModified("type")
                        user.save();
                        res.status(200).json("Logged");
                    } 
                    else{
                        res.status(200).json("Logged");
                    } 
                }
            })

             
        } else if (user.length == 0) {

            const userToCreate = new users({
                username: validToken.given_name + " " + validToken.family_name,
                password: "",
                email: validToken.email,
                points: 0,
                img: validToken.picture,
                type: 02
            });

            userToCreate.save(function (err, newUser) {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).json("Registered User");
            })
        } else {
            res.status(401).send("Not Authorized");

        }

    })
}



//------------------------------------LOGIN_FACEBOOK------------------------------------

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (obj, done) {
    done(null, obj)
})

passport.use(new facebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
    profileFields: ["email", "name"]
}, function (accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)

    const data = profile._json;

    users.find({email: data.email}, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {



            users.findOne({email:data.email}, function (err, results) {
                if (err) {
                    res.status(400).send(err);
                }
                if (results) {
                    if(user[0].type == 01){
                        results.type = 05
                            results.markModified("type")
                            results.save();
                            utilities.generateToken({user: data.email}, (token) => {
                                done(null, token)
                            })
                    } 
                    else if(user[0].type == 02){
                        user[0].type = 07
                        results.markModified("type")
                        user.save();
                        utilities.generateToken({user: data.email}, (token) => {
                            done(null, token)
                        })
                    }else if(user[0].type == 04){
                        user[0].type = 06
                        results.markModified("type")
                        user.save();
                        utilities.generateToken({user: data.email}, (token) => {
                            done(null, token)
                        })
                    } 
                    else{
                        utilities.generateToken({user: data.email}, (token) => {
                            done(null, token)
                        })
                    } 
                }
            })
            
           
        } else if (user.length == 0) {

            const userToCreate = new users({
                username: data.first_name + " " + data.last_name,
                password: "",
                email: data.email,
                points: 0,
                img: "",
                type: 03
            });

            userToCreate.save(function (err, newUser) {
                if (err) {
                    res.status(400).send(err);
                }
                done(null, newUser)
            })

        } else {
            res.status(401).send("Not Authorized");
        }
    })
}))



//------------------------------------EDIT_PROFILE_IMAGE------------------------------------

const editImage = (req, res) => {
    users.findOne({email:req.params.email}, function (err, user) {
        if (err) {
            res.status(400).send(err)
        }
        if(user){
            firebase.uploadImage(req.body.image, "profile_"+req.body.email).then(result => {
                if (result) {
                    users.findOne({email:req.params.email}, function (err, results) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        if (results) {
                            results.img = result
                            results.markModified("image")
                            results.save();
                            res.status(200).json({results: results,savedURL: result})
                        }
                    })
                } else {
                    res.status(400).send("Error");
                }
            }).catch(error => {
                if (error) {
                    res.status(400).send("Error");
                }
            })
        }
    })

}




exports.login = login;
exports.register = register;
exports.getUsers = getUsers;
exports.loginGoogle = loginGoogle;
exports.editImage = editImage;
