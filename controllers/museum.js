const museum = require("../models/museum.js"); 
const speech = require("../API/text2speech.js"); 



const getMuseum = (req, res) => {
    museum.find({museum}, function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        else{
            speech.speeching(rooms[0].description, "museu").then(result => {
                if(result) {
                    
                    museum.findOne({museum}, function (err, rooms) {
                        if (err) {
                            res.status(400).send(err); 
                        }
                        if(rooms){
                            rooms.audio = result
                            rooms.markModified("audio")
                            rooms.save();
                            res.status(200).json({rooms: rooms, savedURL: result})
                        }
                    })
                   
                } else {
                    res.status(400).send("Error"); 
                }
        
            }).catch(error => {
                if(error) {
                    res.status(400).send("Error"); 
                }
            })
        }
    })
}


exports.getMuseum = getMuseum; 