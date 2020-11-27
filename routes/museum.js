const express = require('express');
const router = express.Router();
const controller = require('../controllers/museum.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

router.route('/museum')

    .get(function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getMuseum(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })

module.exports = router;