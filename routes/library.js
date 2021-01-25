const express = require('express')
const router = express.Router();
const controller = require('../controllers/library.js')
const {
    body,
    validationResult,
    param
} = require('express-validator');

/**
 * @route Get /biblioteca
 * @group Library
 * @returns {object} 200 - An array with data about Library
 * @returns {Error} 400 - Unexpected error
 */

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

/**
 * @route Get /biblioteca/acervos
 * @group Library
 * @returns {object} 200 - An array with all data collections
 * @returns {Error} 400 - Unexpected error
 */
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

/**
 * @route Get /biblioteca/acervos/{id}
 * @group Library
 * @param {string} id.path - Collection id (Example 1)
 * @returns {object} 200 - An array with data from specific collection
 * @returns {Error} 400 - Unexpected error
 */
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