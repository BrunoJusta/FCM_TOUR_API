const googleToken = require('../models/google_tokens.js')
const facebookToken = require('../models/facebook_tokens')

const getGoogleInfo = (req, res) => {
    googleToken.find({
        code: req.params.code
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result)
    })
}

const getFacebookInfo = (req, res) => {
    facebookToken.find({
        code: req.params.code
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result)
        console.log(result)
    })
}

exports.getGoogleInfo = getGoogleInfo;
exports.getFacebookInfo = getFacebookInfo;