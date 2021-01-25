const mongoose = require('mongoose');

/**
 * @typedef quizz
 * @property {string} question
 * @property {Object} options
 * @property {string} answer
 * @property {string} language
 */

const quizzSchema = new mongoose.Schema({
    question: String,
    options: {
        A: String,
        B: String,
        C: String,
        D: String
    },
    answer: String,
    language: String,
})

const quizz = mongoose.model('quizzes', quizzSchema)

module.exports = quizz;