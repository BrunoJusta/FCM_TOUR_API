const quizz = require('../models/quizz')

const getQuizz = (req, res) => {
    quizz.find(function (err, questions) {
        if (err) {
            console.log("ERRRRRRRRRRRRRRRRRRRR" + err);
            res.status(404).send(err);
        } else {
            console.log("QUESTIONS" + questions);
            res.status(200).json(questions);
        }
    })
}

exports.getQuizz = getQuizz;