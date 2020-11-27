const museum = require("../models/museum.js"); 


const getMuseum = (req, res) => {
    museum.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(rooms); 
    })
}

exports.getMuseum = getMuseum; 