const utilities = require('../middleware/utilities.js')
const users = require("../models/users.js");
const firebase = require("../API/firebase.js");
const bcrypt = require('bcrypt');
const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const jwt_decode = require('jwt-decode');
const {
    json
} = require('body-parser');

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
                                    res.status(200).json({
                                        res: "Utilizador registado"
                                    });
                                } else if (results.type == 03) {
                                    results.type = 05
                                    results.password = hash
                                    results.markModified("type")
                                    results.save();
                                    res.status(200).json({
                                        res: "Utilizador registado"
                                    });
                                } else if (results.type == 07) {
                                    results.type = 06
                                    results.password = hash
                                    results.markModified("type")
                                    results.save();
                                    res.status(200).json({
                                        res: "Utilizador registad"
                                    });
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
                                res: "User Registado"
                            });
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
                res.status(401).send("Credenciais inválidas");
            } else {
                bcrypt.compare(req.body.password, user[0].password).then(function (result) {
                    if (result) {
                        utilities.generateToken({
                            user: req.body.email,
                            name: user[0].username,
                            img: user[0].img,
                            points: user[0].points,
                            type: user[0].type

                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else {
                        res.status(401).send("Credenciais inválidas");
                    }
                });
            }
        } else {
            res.status(401).send("Credenciais inválidas");
        }

    })
}

//------------------------------------LOGIN-FACEBOOK------------------------------------

const loginFacebook = (req, res) => {
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
                    if (results.type == 01) {
                        results.type = 05
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            email: req.body.email,
                            username: req.body.username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else if (results.type == 02) {
                        results.type = 07
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            email: req.body.email,
                            username: req.body.username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else if (results.type == 04) {
                        results.type = 06
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            email: req.body.email,
                            username: req.body.username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else {
                        utilities.generateToken({
                            email: req.body.email,
                            username: req.body.username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    }
                }
            })
        } else if (user.length == 0) {
            const userToCreate = new users({
                username: req.body.username,
                password: "",
                email: req.body.email,
                points: 0,
                img: "",
                type: 03
            });
            userToCreate.save(function (err, newUser) {
                if (err) {
                    res.status(400).send(err);
                }
                utilities.generateToken({
                    email: req.body.email,
                    username: req.body.username,
                    picture: ""
                }, (token) => {
                    res.status(200).json({
                        token: token
                    });
                })
            })

        } else {
            res.status(401).send("Not Authorized");
        }
    })
}

//------------------------------------LOGIN-GOOGLE------------------------------------

const loginGoogle = (req, res) => {
    var decodedToken = jwt_decode(req.body.token)
    const username = decodedToken.name
    const userEmail = decodedToken.email
    const userPicture = decodedToken.picture
    users.find({
        email: userEmail
    }, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }
        if (user.length > 0) {
            users.findOne({
                email: userEmail
            }, function (err, results) {
                if (err) {
                    res.status(400).send(err);
                }
                if (results) {
                    if (results.img == "") {
                        results.img = userPicture
                        results.markModified("img")
                        results.save();
                    }
                    if (results.type == 01) {
                        results.type = 04
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            email: userEmail,
                            username: username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else if (results.type == 03) {
                        results.type = 07
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            email: userEmail,
                            username: username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else if (results.type == 05) {
                        results.type = 06
                        results.markModified("type")
                        results.save();
                        utilities.generateToken({
                            email: userEmail,
                            username: username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    } else {
                        utilities.generateToken({
                            email: userEmail,
                            username: username,
                            picture: results.img
                        }, (token) => {
                            res.status(200).json({
                                token: token
                            });
                        })
                    }
                }
            })
        } else if (user.length == 0) {
            const userToCreate = new users({
                username: username,
                password: "",
                email: userEmail,
                points: 0,
                img: userPicture,
                type: 02
            });

            userToCreate.save(function (err, newUser) {
                if (err) {
                    res.status(400).send(err);
                }
                utilities.generateToken({
                    email: userEmail,
                    username: username,
                    picture: userPicture
                }, (token) => {
                    res.status(200).json({
                        token: token
                    });
                })
            })
        } else {
            res.status(401).send("Not Authorized");
        }
    })
}

//------------------------------------MUDAR-IMAGEM-PERFIL------------------------------------

const editImage = (req, res) => {
    users.findOne({
        email: req.params.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err)
        }
        if (user) {
            firebase.uploadImage(res, req.params.email, req.file, req.file.originalname, req.file.mimetype.substring(6))

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
            if (req.body.oldPassword != req.body.newPassword) {
                bcrypt.compare(req.body.oldPassword, user.password, function (error, result) {
                    if (result) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                                user.password = hash
                                user.markModified("password")
                                user.save();
                                res.status(200).json({
                                    result: true,
                                    msg: "Password Alterada"
                                })
                            });
                        });
                    } else {
                        res.status(406).json({
                            result: false
                        })
                    }
                })
            } else {
                res.status(406).send("A nova palavra passe não pode ser a mesma que a antiga.");
            }
        }
    })

}

//-------------------------ADICIONAR-PALAVRA-PASSE(FACEBOOK, GOOGLE ACCOUNTS)----------------------


const addPassword = (req, res) => {
    users.findOne({
        email: req.params.email
    }, function (err, user) {
        if (err) {
            res.status(400).send(err)
        }
        if (user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                    if (user.type == 02) {
                        user.type = 04
                        user.password = hash
                        user.markModified("password")
                        user.save();
                        res.status(200).json({
                            result: true,
                            msg: "Password Alterada"
                        })
                    } else if (user.type == 03) {
                        user.type = 05
                        user.password = hash
                        user.markModified("password")
                        user.save();
                        res.status(200).json({
                            result: true,
                            msg: "Password Alterada"
                        })
                    } else if (user.type == 07) {
                        user.type = 06
                        user.password = hash
                        user.markModified("password")
                        user.save();
                        res.status(200).json({
                            result: true,
                            msg: "Password Alterada"
                        })
                    } else {
                        user.password = hash
                        user.markModified("password")
                        user.save();
                        res.status(200).json({
                            result: true,
                            msg: "Password Alterada"
                        })
                    }
                });
            });
        }
    })
}

exports.login = login;
exports.register = register;
exports.editImage = editImage;
exports.editPassword = editPassword;
exports.addPassword = addPassword;
exports.loginFacebook = loginFacebook;
exports.loginGoogle = loginGoogle;