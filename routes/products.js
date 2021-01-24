const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

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
