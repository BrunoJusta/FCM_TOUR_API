const quizz = require('../models/quizz')

const getQuizz = (req, res) => {
    quizz.find(function (err, questions) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).json({questions});
        }
    })
}

exports.getQuizz = getQuizz;