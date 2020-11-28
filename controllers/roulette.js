const roulette = require("../models/roulette.js"); 


const getRoulette = (req, res) => {
    roulette.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(roulette); 
    })
}

exports.getRoulette = getRoulette; 