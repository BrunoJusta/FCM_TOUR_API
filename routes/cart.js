const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.js')
const { body, validationResult, param } = require('express-validator');

router.post('/:id/:product', [param('id').notEmpty().escape(), param('product').notEmpty().escape() ], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.addToCart(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


router.get('/:id', [param('id').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getCartByUser(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

router.delete('/:id/:product', [
    param('id').notEmpty().escape(),
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
