const express = require('express')
const router = express.Router();
const controller = require('../controllers/users.js')
const { validationResult, body } = require('express-validator')

/**
 * @route POST /login
 * @group Users
 * @param {object} object.body - User's Credentials - eg. {"email":"marleneOliveira@gmail.com", "password":"12345"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Unexpected error
 */
router.post('/login',  function (req, res) {
    controller.login(req, res); 
})

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

],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.register(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
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
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router