const express = require('express');
const router = express.Router();
const controller = require('../controllers/roulette.js')
const {
    body,
    validationResult
} = require('express-validator');

router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getRoulette(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

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
/* router.get('/premmios/:number', [
    param('number').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getRoomsByNumber(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
}) */

module.exports = router;