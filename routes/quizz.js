const express = require('express')
const router = express.Router();
const controller = require('../controllers/quizz')
const {
    body,
    validationResult,
    param
} = require('express-validator');


/**
 * @route Get /quizz
 * @group Quizz
 * @returns {object} 200 - An array with all the questions and answers of the quizz
 * @returns {Error} 404 - Invalid Token
 * @security Bearer
 */

router.get("/", function (req, res) {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        controller.getQuizz(req, res);
    } else {
        res.status(404).json({
            erros: errors.array()
        })
    }
})


module.exports = router;