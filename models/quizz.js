const mongoose = require('mongoose');

const quizzSchema = new mongoose.Schema({
    question: String,
    options: {
        A: String,
        B: String,
        C: String,
        D: String
    },
    answer: String
})

const quizz = mongoose.model('quizzes', quizzSchema)

module.exports = quizz;