const room = require("../models/rooms.js");
const speech = require("../API/text2speech.js");


const getRooms = (req, res) => {
    room.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(rooms);
    })
}

const getRoomsByNumber = (req, res) => {
    room.find({
        number: req.params.number
    }, function (err, rooms) {
        if (err) {
            res.status(400).send(err);
        } else {
            speech.speeching(rooms[0].description, rooms[0].name).then(result => {
                if (result) {
                    room.findOne({
                        number: req.params.number
                    }, function (err, rooms) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        if (rooms) {
                            rooms.audio = result
                            rooms.markModified("audio")
                            rooms.save();
                            res.status(200).json({
                                rooms: rooms,
                                savedURL: result
                            })
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
    })
}

exports.getRoomsByNumber = getRoomsByNumber;
exports.getRooms = getRooms;