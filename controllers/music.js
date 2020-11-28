const music = require("../models/music.js"); 


const getCupertinos = (req, res) => {
    music.find({music}, function (err, result) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(result[0].cupertinos); 
    })
}

const getCiclos = (req, res) => {
    music.find({music}, function (err, result) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(result[0].ciclos); 
    })
}


exports.getCupertinos = getCupertinos;
exports.getCiclos = getCiclos; 

