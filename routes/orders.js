const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders.js')
const controllerCart = require('../controllers/cart.js')
const { body, validationResult, param } = require('express-validator');

/**
 * @route POST /encomenda/{email}
 * @group Orders
 * @param {string} email.path - User's email
 * @param {array} array.body - [{name,adress,zipcode,city,total},{[products]}]
 * @returns {object} 200 - Add an order to the user
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.post('/:email', [param('email').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.addOrder(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


/**
 * @route Get /encomenda/utilizador/{email}
 * @group Orders
 * @param {string} email.path - User's email
 * @returns {object} 200 - An array of user order data
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/utilizador/:email', [param('email').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getOrdersByUser(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /encomenda/numero/{id}
 * @group Orders
 * @param {string} id.path - Id's from a order
 * @returns {object} 200 - An array of data from specific order
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/numero/:id', [param('id').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getOrdersByID(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


module.exports = router;
