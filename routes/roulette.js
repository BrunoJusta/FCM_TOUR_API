const express = require('express');
const router = express.Router();
const controller = require('../controllers/roulette.js')

router.get('/roulette', function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.getRoulette(req, res);
        } else {
            res.status(404).json({
                errors: errors.array()
            })
        }
    })

module.exports = router;