const quizz = require('../models/quizz')

const getQuizz = (req, res) => {
    quizz.find(function (err, questions) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(questions);
    })
}

exports.getQuizz = getQuizz;