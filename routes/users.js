const express = require('express')
const router = express.Router();
const controller = require('../controllers/users.js')
const {
    validationResult,
    body
} = require('express-validator')
const utilities = require('../utilities/utilities.js')
const passport = require('passport')

/**
 * @route POST /login
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"email":"marleneOliveira@gmail.com", "password":"12345"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Unexpected error
 */
router.post('/login', function (req, res) {
    controller.login(req, res);
})

router.get('/', function (req, res) {
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

                            controller.loginGoogle(validToken, res)

                            /*  res.status(200).send({
                                 tokens: tokens,
                                 user: user_info,
                                 validToken: validToken
                             }) */
                        }
                    })
                }
            })
        }
    })
})

//------------------------------------FACEBOOK------------------------------------

router.get('/auth/facebook', passport.authenticate("facebook"));

router.get('/auth/facebook/callback', passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
}));

router.get("/fail", (req, res) => {
    res.send("Failed Attempt");
})

router.get('/', (req, res) => {
    res.send("Success");
})

//------------------------------------FACEBOOK------------------------------------



/**
 * @route POST /register
 * @group Users
 * @param {object} object.body - Users - eg. {"username": "Marlene", "email": "marleneOliveira@gmail.com", "password":"12345"}
 * @returns {object} 200 - New User
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.post('/register', [
    body('username').notEmpty().escape(),
    body('password').notEmpty().escape(),
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


/**
 * @route GET /utilizadores
 * @group Users
 * @returns {object} 200 - An array of users info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/utilizadores', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getUsers(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router