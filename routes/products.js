const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

/**
 * @route Get /produtos
 * @group Products
 * @returns {object} 200 - An array of all products
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getProducts(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /produtos/preco/alto
 * @group Products
 * @returns {object} 200 - An array of all products ordered by highest price
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/preco/alto', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getProductsbyPriceHigh(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /produtos/preco/baixo
 * @group Products
 * @returns {object} 200 - An array of all products ordered by lowest price
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/preco/baixo', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getProductsbyPriceLow(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /produtos/{id}/{email}
 * @group Products
 * @param {string} id.path - Product's id
 * @param {string} email.path - User's email
 * @returns {object} 200 - An array of data from specific product
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.get('/:id/:email', [
    param('id').notEmpty().escape(),
    param('email').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getProductsbyID(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


/**
 * @route Delete /produtos/{id}
 * @group Products
 * @param {string} id.path - Product's id
 * @returns {object} 200 - Remove a specific product
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
router.delete('/:id', [
    param('id').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.deleteProductsbyID(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


module.exports = router;
