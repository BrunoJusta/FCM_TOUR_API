const express = require('express');
const router = express.Router();
const controller = require('../controllers/qrCode')
const {
    body,
    validationResult,
    param
} = require('express-validator');

router.post('/', function (req, res) {
    controller.generateTicket(req, res);
})

router.get('/', [
    body('code').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getTicketByCode(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router;