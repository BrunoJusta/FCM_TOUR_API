const quizz = require('../models/quizz')

const getQuizz = (req, res) => {
    quizz.find(function (err, questions) {
        if (err) {
            res.status(404).send(err);
        } else {
            let quizz = []
            let quizz_en = []

            for (let i = 0; i < questions.length; i++) {
                
                if (questions[i].language == "EN") {
                    quizz_en.push(questions[i])
                }else{
                    quizz.push(questions[i])
                }

            }

           
            if (req.headers.language == "EN") res.status(200).json(quizz_en); 
            else  res.status(200).json(quizz);
        }
    })
}

exports.getQuizz = getQuizz;