const museum = require("../models/museum.js"); 
const speech = require("../API/googleSpeech/text2speech.js"); 



const getMuseum = (req, res) => {
    museum.find({museum}, function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        else{
        speech.Text2Speech(rooms[0].description, "museu")
        console.log(rooms[0].description)
        res.status(200).json(rooms); 


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