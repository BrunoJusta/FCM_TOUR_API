const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders.js')
const { body, validationResult, param } = require('express-validator');

router.post('/:id', [param('id').notEmpty().escape()], function (req, res) {
    console.log("ok")
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.addOrder(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})


router.get('/utilizador/:id', [param('id').notEmpty().escape()], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getOrdersByUser(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

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
