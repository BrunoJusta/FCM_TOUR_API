const express = require('express');
const router = express.Router();
const controller = require('../controllers/music.js');
const {
    body,
    validationResult,
    param
} = require('express-validator');

router.route('/cupertinos')
    /**
     * @route GET /cupertinos
     * @group Cupertinos
     * @returns {object} 200 - An array of music info
     * @returns {Error} 400 - Unexpected error
     * @returns {Error} 401 - Invalid Token
     * @security Bearer
     */
    .get(function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getMusic(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })



module.exports = router;