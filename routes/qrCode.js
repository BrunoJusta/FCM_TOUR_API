const express = require('express');
const router = express.Router();
const controller = require('../controllers/qrCode')
const {
    body,
    validationResult,
    param
} = require('express-validator');

/**
 * @route Post /ticket
 * @group Tickets
 * @returns {object} 200 - Create a ticket code
 * @returns {Error} 400 - Unexpected error
 */
router.post('/', function (req, res) {
    controller.generateTicket(req, res);
})

/**
 * @route Get /ticket/{code}
 * @group Tickets
 * @param {string} code.path - Ticket number
 * @returns {object} 200 - An array with data from a specifc ticket number
 * @returns {Error} 400 - Unexpected error
 */
router.get('/:code', [
    param('code').notEmpty().escape(),
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