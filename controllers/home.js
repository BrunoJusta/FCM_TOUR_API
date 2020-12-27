const home = require('../models/home.js')

const getHome = (req, res) => {
    home.find({home}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result)
    })
}

exports.getHome = getHome;