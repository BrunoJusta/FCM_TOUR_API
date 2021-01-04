const express = require('express')
const passport = require('passport')
const {
    validationResult,
    body,
    param
} = require('express-validator')

const utilities = require('../utilities/utilities.js')
const controller = require('../controllers/users.js')

const router = express.Router();

//------------------------------------LOGIN------------------------------------

router.post('/login', function (req, res) {
    controller.login(req, res);
})

//------------------------------------GOOGLE------------------------------------

router.get('/google', function (req, res) {
    res.send(utilities.urlGoogle())
})

router.get('/login', function (req, res) {
    utilities.getTokens(req.query.code, (error, tokens) => {

        if (error) {
            res.status(400).send(error)
        } else {
            utilities.getUserInfo(tokens.access_token, (error, user_info) => {
                if (error) {
                    res.status(400).send(error)
                } else {
                    utilities.validateTokenGoogle(tokens.id_token, (error, validToken) => {

                        if (error) {
                            res.status(400).send(error)
                        } else {
                            controller.loginGoogle(validToken, res, tokens.id_token, tokens.access_token, req.query.code)
                        }
                    })
                }
            })
        }
    })
})

//------------------------------------FACEBOOK------------------------------------

router.get('/auth/facebook/token?access_token=:code',
    passport.authenticate('facebookToken'),
    function (req, res) {
        if (req.user) {
            console.log("USER LOGADO: ")
            res.send(200, req.user);
        } else {
            res.send(401)
        }
    }
);

/* router.get('/auth/facebook', passport.authenticate("facebook"));

router.get('/auth/facebook/callback', function (req, res, next) { 
    passport.authenticate("facebook")(req, res, next)
}); */

//------------------------------------REGISTO------------------------------------

router.post('/register', [
    body('username').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('confPassword').notEmpty().escape(),
    body('email').notEmpty().escape(),

], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.register(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

//------------------------------------MUDAR-IMAGEM-PERFIL------------------------------------

router.put('/profile/:email', [
    param('email').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.editImage(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

//------------------------------------MUDAR-PALAVRA-PASSE------------------------------------

router.put('/pass/:email', [
    param('email').notEmpty().escape(),
    body('newPassword').notEmpty().escape(),
    body('confPassword').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.editPassword(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

module.exports = router