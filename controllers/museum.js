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
                            console.log(rooms)

                            rooms.audio = result
                            rooms.markModified("audio")
                            rooms.save();
                            console.log(rooms.audio)
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

/*const addMuseum = (req, res) =>{
    const newMuseum = new museum({
        description: req.body.description,
        cover: req.body.cover,
        temporary: req.body.temporary,
        permanent: req.body.permanent,
        artists: req.body.artists
    })

    newMuseum.save(function(err,museum){
        if (err){
            res.status(400).send(err);
        }
        res.status(200).json(museum)
    })
}*/
exports.getMuseum = getMuseum; 