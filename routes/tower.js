const express = require('express')
const router = express.Router();
const controller = require('../controllers/tower.js')
const {
    body,
    validationResult
} = require('express-validator');

router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getTowerRooms(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

module.exports = router;