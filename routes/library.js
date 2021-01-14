const express = require('express')
const router = express.Router();
const controller = require('../controllers/library.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getLibrary(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

router.get('/acervos', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getCollections(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

router.get('/acervos/:id', [
    param('id').notEmpty().escape()
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getCollectionsByID(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

module.exports = router;