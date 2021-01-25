const express = require('express')
const router = express.Router();
const controller = require('../controllers/tower.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

/**
 * @route GET /torre
 * @group Tower
 * @returns {object} 200 - An Object with description and image of the Tower
 * @returns {Error} 400 - Unexpected error
 */
router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getTower(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route GET /torre/salas
 * @group Tower
 * @returns {object} 200 - An Array with all Rooms of the Tower
 * @returns {Error} 400 - Unexpected error
 */
router.route('/salas')
    .get(function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getRooms(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })

/**
 * @route GET /torre/salas/{number}
 * @group Tower
 * @param {string} number.path - Room's number
 * @returns {object} 200 - An Object with the Room's Info
 * @returns {Error} 400 - Unexpected error
 */
router.get('/salas/:number', [
    param('number').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getRoomsByNumber(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router;