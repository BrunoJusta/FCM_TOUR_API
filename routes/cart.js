const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');
/**
 * @route POST /carrinho/{email}/{product}
 * @group Cart
 * @param {string} email.path - User's email
 * @param {string} product.path - Product's number (Example: 1)
 * @returns {object} 200 - New product add to cart
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.post('/:email/:product', [param('email').notEmpty().escape(), param('product').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.addToCart(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


/**
 * @route Get /carrinho/{email}
 * @group Cart
 * @param {string} email.path - User's email
 * @returns {object} 200 - An array with products in a user cart
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.get('/:email', [param('email').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getCartByUser(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Delete /carrinho/{email}/{product}
 * @group Cart
 * @param {string} email.path - User's email
 * @param {string} product.path - Product's number
 * @returns {object} 200 - The product is deleted from the cart
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

router.delete('/:email/:product', [
    param('email').notEmpty().escape(),
    param('product').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.deleteProductInCart(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router;