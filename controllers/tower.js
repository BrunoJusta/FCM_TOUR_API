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


const getTowerRoomsByID = (req, res) => {
    tower.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{

          
            for(let i=0; i<result[0].rooms.length; i++){
                let name = result[0].rooms[i].name
               

                if(name == req.params.id){
                    speech.speeching(result[0].rooms[i].description, name )
                }
            }

            res.status(200).json(result)  
        }
       
    })
}


const postURL = (req, res) => {
    tower.findOne({tower}, function (err, result) {
        if (err) {
            res.status(400).send(err); 
        }
        if(result){
            result[0].url = req.body.lotação
            result.save()
        }
    })
}

exports.getTowerRooms = getTowerRooms;
exports.postURL = postURL;
exports.getTowerRoomsByID = getTowerRoomsByID;

