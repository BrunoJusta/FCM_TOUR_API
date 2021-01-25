const express = require('express');
const router = express.Router();
const controller = require('../controllers/museum.js')
const {
    body,
    param,
    validationResult
} = require('express-validator');

/**
 * @route Get /museu
 * @group Museum
 * @returns {object} 200 - An array with all data from Museum
 * @returns {Error} 400 - Unexpected error
 */
router.get('/', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getMuseum(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /museu/esculturas
 * @group Museum
 * @returns {object} 200 - An array with all data from Sculptures
 * @returns {Error} 400 - Unexpected error
 */
router.get('/esculturas', function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.getSculptures(req, res);
    } else {
        res.status(404).json({
            errors: errors.array()
        })
    }
})

/**
 * @route Get /museu/temporarias/{id}
 * @group Museum
 * @param {string} id.path - Temporary exhibitions id
 * @returns {object} 200 - An array with data from a specific temporary exhibitions
 * @returns {Error} 400 - Unexpected error
 */
router.get('/temporarias/:id', [
    param('id').notEmpty().escape()
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getTempByID(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route Get /museu/permanente/{id}
 * @group Museum
 * @param {string} id.path - Permanent exhibitions id
 * @returns {object} 200 - An array with data from a specific permanent exhibitions
 * @returns {Error} 400 - Unexpected error
 */
router.get('/permanente/:id', [
    param('id').notEmpty().escape()
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getPermaByID(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})

/**
 * @route Get /museu/quadros/{id}
 * @group Museum
 * @param {string} id.path - Frame id
 * @returns {object} 200 - An array with data from a specific frame
 * @returns {Error} 400 - Unexpected error
 */
router.get('/quadros/:id', [
    param('id').notEmpty().escape()
], function (req, res) {
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        controller.getPaintingByID(req, res);
    } else {
        res.status(404).json({
            errors: erros.array()
        })
    }
})


module.exports = router;