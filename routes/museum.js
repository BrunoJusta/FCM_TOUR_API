const express = require('express');
const router = express.Router();
const controller = require('../controllers/museum.js')
const { body, validationResult, param} = require('express-validator');

router.get('/museum', function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getMuseum(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })

    router.post('/museum', [body('description').notEmpty().escape(),body('cover').notEmpty().escape()],
    function (req, res){
        const errors =  validationResult(req);
        if (errors.isEmpty()){
            controller.createRoom(req, res);
        }else{
            res.status(404).jsom({errors: errors.array()})
        }
    })

module.exports = router;