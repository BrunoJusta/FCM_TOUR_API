const tower = require('../models/tower.js')
const room = require("../models/rooms.js");
const speech = require("../API/text2speech.js");

const getTower = (req, res) => {
    tower.find({
        tower
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            if(req.headers.language == "EN"){
                res.status(200).json({
                    description: result[0].description_en,
                    cover: result[0].cover
                })
            }
            else{
                res.status(200).json({
                    description: result[0].description,
                    cover: result[0].cover
                })
                
            }
        }
       
    })
}

const getRooms = (req, res) => {
    room.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(rooms);
    })
}

const getRoomsByNumber = (req, res) => {
    room.find({number: req.params.number}, function (err, rooms) {
        if (err) {
            res.status(400).send(err);
        } else {
            let language = req.headers.language
            if(language == "EN" && rooms[0].audio_en != ''){
                res.status(200).json({
                    audio: rooms[0].audio_en,
                    imgs: rooms[0].imgs,
                    name: rooms[0].name,
                    description: rooms[0].description_en
                })
            }
            else if( language == "PT" && rooms[0].audio != '' ){
                res.status(200).json({
                    audio: rooms[0].audio,
                    imgs: rooms[0].imgs,
                    name: rooms[0].name,
                    description: rooms[0].description
                })
            }else{
                let description 
                if(language == "EN" ) description = rooms[0].description_en
                else description = rooms[0].description
                speech.speeching(description, rooms[0].name, language).then(result => {
                    if (result) {
                        room.findOne({
                            number: req.params.number
                        }, function (err, rooms) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            if (rooms) {
                                if(language == "EN"){
                                    rooms.audio_en = result
                                    rooms.markModified("audio_en")
                                    rooms.save();
                                    res.status(200).json({
                                        audio: rooms.audio_en,
                                        imgs: rooms.imgs,
                                        name: rooms.name,
                                        description: rooms.description_en
                                    })
                                }
                                else {
                                    rooms.audio = result
                                    rooms.markModified("audio")
                                    rooms.save();
                                    res.status(200).json({
                                        audio: rooms.audio,
                                        imgs: rooms.imgs,
                                        name: rooms.name,
                                        description: rooms.description
                                    }) 
                                }                      
                            }
                        })
    
                    } else {
                        res.status(400).send("Error");
                    }
                }).catch(error => {
                    if (error) {
                        res.status(400).send("Error");
                    }
                })
            }
        }
    })
}

exports.getRoomsByNumber = getRoomsByNumber;
exports.getRooms = getRooms;
exports.getTower = getTower;

