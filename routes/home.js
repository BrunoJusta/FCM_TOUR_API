const express = require('express');
const router = express.Router();
const controller = require('../controllers/home.js')
const { validationResult } = require('express-validator');

router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getHome(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router;
