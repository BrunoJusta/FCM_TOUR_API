const express = require('express')
const {
    validationResult,
    body,
    param
} = require('express-validator')

const controller = require('../controllers/tokens.js')
const router = express.Router();

router.get('/Google/:code', [
    param('code').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getGoogleInfo(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

router.get('/Facebook/:code', [
    param('code').notEmpty().escape(),
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getFacebookInfo(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

module.exports = router;