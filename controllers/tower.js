const tower = require('../models/tower.js')

const getTowerRooms = (req, res) => {
    tower.find({
        tower
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        
        res.status(200).json(result)
    })
}

exports.getTowerRooms = getTowerRooms;