const express = require('express');
const router = express.Router();
const controller = require('../controllers/roulette.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

/**
 * @route Get /roleta/girar
 * @group Roulette
 * @returns {object} 200 - Returns the number of points the user has earned
 * @returns {Error} 404 - Invalid Token
 * @security Bearer
 */

router.get('/girar', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getPoints(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /roleta/premios
 * @group Roulette
 * @returns {object} 200 - An array with the prizes of the roulette
 * @returns {Error} 404 - Invalid Token
 * @security Bearer
 */

router.get('/premios', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getItems(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /roleta/premios/{number}
 * @group Roulette
 * @param {string} number.path - number of the prize
 * @returns {object} 200 - Returns a specific prize of the roulette
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.get('/premios/:number', [
    param('number').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getItemsByNumber(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router;