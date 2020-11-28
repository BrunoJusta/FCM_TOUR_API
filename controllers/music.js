const music = require("../models/music.js"); 


const getMusic = (req, res) => {
    music.find(function (err, result) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(result); 
    })
}


exports.getMusic = getMusic; 
