const express = require('express');
const router = express.Router();
const controller = require('../controllers/home.js')
const { validationResult } = require('express-validator');

/**
 * @route Get /home
 * @group Home
 * @returns {object} 200 - An array with data from Fundation
 * @returns {Error} 400 - Unexpected error
 */

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
