const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

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