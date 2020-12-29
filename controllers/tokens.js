const googleToken = require('../models/google_tokens.js')

const getGoogleInfo = (req, res) => {
    googleToken.find({code: req.params.code}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result)
    })
}

exports.getGoogleInfo = getGoogleInfo;