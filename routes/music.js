const express = require('express');
const router = express.Router();
const controller = require('../controllers/music.js');
const {
    body,
    validationResult,
    param
} = require('express-validator');

    /**
     * @route GET /musica/cupertinos
     * @group Music
     * @returns {object} 200 - An array of Cuperinos info
     * @returns {Error} 400 - Unexpected error
     */
router.route('/cupertinos')
    .get(function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getCupertinos(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })

    /**
     * @route GET /musica/ciclos
     * @group Music
     * @returns {object} 200 - An array of cycles info~
     * @returns {Error} 400 - Unexpected error
     */
    router.route('/ciclos')
    .get(function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getCiclos(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })


/**
 * @route GET /musica
 * @group Music
 * @returns {object} 200 - An array of music info
 * @returns {Error} 400 - Unexpected error
 */
router.route('/')
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