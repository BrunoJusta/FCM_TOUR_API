const express = require('express')
const router = express.Router();
const controller = require('../controllers/users.js')
const { validationResult, body } = require('express-validator')

 /**
     * @route POST /login
     * @group User's
     * @param {object} object.body - User's Credentials - eg. {"name":"admin", "password":"1234"}
     * @returns {object} 200 - Bearer Token
     * @returns {Error} 400 - Unexpected error
     */
router.post('/login',  function (req, res) {
    controller.login(req, res); 
})

router.post('/register', [
    body('username').notEmpty().escape(), 
    body('password').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.register(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router