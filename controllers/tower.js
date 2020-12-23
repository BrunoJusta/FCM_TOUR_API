const tower = require('../models/tower.js')
const speech = require("../API/text2speech.js"); 

const getTowerRooms = (req, res) => {
    tower.find({
        tower
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
           speech.speeching(result[0].description, "tower")
           res.status(200).json(result)  
        }
       
    })
}


exports.getTowerRooms = getTowerRooms;

