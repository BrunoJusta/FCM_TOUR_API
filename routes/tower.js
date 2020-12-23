const express = require('express')
const router = express.Router();
const controller = require('../controllers/tower.js')
const {
    body, param,
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


router.get('/:number', [
    param('number')], function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getTowerRoomsByID(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

router.put('/', function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.postURL(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }

})

module.exports = router;