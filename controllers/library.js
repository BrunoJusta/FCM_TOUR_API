const library = require('../models/library.js')

const getLibrary = (req, res) => {
    library.find({library}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result)
    })
}

exports.getLibrary = getLibrary;