const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms.js')
const { body, validationResult, param} = require('express-validator');



router.route('/')

    .get( function (req, res) {
        const errors = validationResult(req); 
        if (errors.isEmpty()) {
            controller.getRooms(req, res); 
        } else {
            res.status(404).json({errors: errors.array()})
        }
    })
   
    .post([body('piso').notEmpty().isNumeric().escape(), body('número').notEmpty().isNumeric().escape()],
        function (req, res) {
            const errors = validationResult(req); 
            if (errors.isEmpty()) {
                controller.createRoom(req, res); 
            } else {
                res.status(404).json({errors: errors.array()})
            }
        })



router.get('/:numero', [
    param('numero').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getRoomsByNumber(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.delete('/:numero',  [
    param('numero').notEmpty().escape(),
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.deleteRoom(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }

})

router.put('/:numero',  [
    param('numero').notEmpty().escape(), body('lotação').notEmpty().isNumeric().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.edit(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }

})

module.exports = router;

