const utilities = require('../utilities/utilities.js')
const users = require("../models/users.js");
const tokens = require("../models/tokens.js");

const firebase = require("../API/firebase.js");
const bcrypt = require('bcrypt');
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;

//------------------------------------REGISTO------------------------------------

const register = (req, res) => {
    if (req.body.password == req.body.confPassword) {
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

                users.find({
                    email: req.body.email
                }, function (err, user) {
                    if (err) {
                        res.status(400).send(err);
                    }

                    if (user.length > 0) {

                        users.findOne({
                            email: req.body.email
                        }, function (err, results) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            if (results) {
                                if (results.type == 02) {
                                    results.type = 04
                                    results.password = hash
                                    results.markModified("type")
                                    results.save();
                                    res.status(200).json({res:"Utilizador registado"});
                                } else if (results.type == 03) {
                                    results.type = 05
                                    results.password = hash
                                    results.markModified("type")
                                    results.save();
                                    res.status(200).json({res:"Utilizador registado"});
                                } else if (results.type == 07) {
                                    results.type = 06
                                    results.password = hash
                                    results.markModified("type")
                                    results.save();
                                    res.status(200).json({res:"Utilizador registad"});
                                } else {
                                    res.status(409).send("Utilizador já existente");
                                }
                            }
                        })

                    } else {

                        userToCreate.save(function (err, newUser) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            res.status(200).json({
                                res:
                            "User Registado"});
                        })
                    }
                })
            });
        });
    } else {
        res.status(406).send("Palavras Passes não coincidem");
    }

}

//------------------------------------LOGIN-NORMAL------------------------------------

const login = (req, res) => {
    users.find({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {
            if (user[0].type == 02 || user[0].type == 03 || user[0].type == 07) {
                res.status(401).send("Conta não existe");
            } else {
                bcrypt.compare(req.body.password, user[0].password).then(function (result) {
                    if (result) {
                        utilities.generateToken({
                            user: req.body.email
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
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

//------------------------------------LOGIN-GOOGLE------------------------------------

const loginGoogle = (validToken, res, id_token, access_token, code ) => {
    
    const tokenCreate = new tokens({
        code: code,
        access_token: access_token,
        bearer: id_token,
    });

    users.find({
        email: validToken.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {
            users.findOne({
                email: validToken.email
            }, function (err, results) {
                if (err) {
                    res.status(400).send(err);
                }
                if (results) {
                    if (results.type == 01) {
                        results.type = 04
                        results.markModified("type")
                        results.save();
                        res.status(200).json("Logged");
                    } else if (results.type == 03) {
                        results.type = 07
                        results.markModified("type")
                        results.save();
                        res.status(200).json("Logged");
                    } else if (results.type == 05) {
                        results.type = 06
                        results.markModified("type")
                        results.save();
                        res.status(200).json("Logged");
                    } else {
                        tokens.find({code: code}, function (err, result) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else{
                                tokenCreate.save(function (err, newUser) {
                                    if (err) {
                                        res.status(400).send(err);
                                    }
                                    res.status(200).json("Logged");
                                })
                            }
                        })
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

//------------------------------------LOGIN-FACEBOOK------------------------------------

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
    users.find({
        email: data.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {

            users.findOne({
                email: data.email
            }, function (err, results) {
                if (err) {
                    res.status(400).send(err);
                }
                if (results) {
                    if (results.type == 01) {
                        results.type = 05
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            user: data.email
                        }, (token) => {
                            done(null, token)
                        })
                    } else if (results.type == 02) {
                        results.type = 07
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            user: data.email
                        }, (token) => {
                            done(null, token)
                        })
                    } else if (results.type == 04) {
                        results.type = 06
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            user: data.email
                        }, (token) => {
                            done(null, token)
                        })
                    } else {
                        utilities.generateToken({
                            user: data.email
                        }, (token) => {
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

//------------------------------------MUDAR-IMAGEM-PERFIL------------------------------------

const editImage = (req, res) => {
    users.findOne({
        email: req.params.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err)
        }
        if (user) {
            firebase.uploadImage(req.body.image, "profile_" + req.body.email).then(result => {
                if (result) {
                    users.findOne({
                        email: req.params.email
                    }, function (err, results) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        if (results) {
                            results.img = result
                            results.markModified("image")
                            results.save();
                            res.status(200).json({
                                results: results,
                                savedURL: result
                            })
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

//------------------------------------MUDAR-PALAVRA-PASSE------------------------------------

const editPassword = (req, res) => {
    users.findOne({
        email: req.params.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err)
        }
        if (user) {
            if (req.body.newPassword == req.body.confPassword) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                        if (user.type == 02) {
                            user.type = 04
                            user.password = hash
                            user.markModified("password")
                            user.save();
                            res.status(200).json("Password Alterada")
                        } else if (user.type == 03) {
                            user.type = 05
                            user.password = hash
                            user.markModified("password")
                            user.save();
                            res.status(200).json("Password Alterada")
                        } else if (user.type == 07) {
                            user.type = 06
                            user.password = hash
                            user.markModified("password")
                            user.save();
                            res.status(200).json("Password Alterada")
                        } else {
                            user.password = hash
                            user.markModified("password")
                            user.save();
                            res.status(200).json("Password Alterada")
                        }
                    });
                });
            } else {
                res.status(406).send("Palavras Passes nao coincidem");
            }
        }
    })
}

exports.login = login;
exports.register = register;
exports.loginGoogle = loginGoogle;
exports.editImage = editImage;
exports.editPassword = editPassword