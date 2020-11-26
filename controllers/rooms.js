const room = require("../models/rooms.js"); 


const getRooms = (req, res) => {
    room.find(function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(rooms); 
    })
}


const createRoom = (req, res) => {
    const newRoom = new room({
        piso: req.body.piso,
        número: req.body.número,
        lotação: req.body.lotação,
        ocupada: req.body.ocupada,
    })

    newRoom.save(function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(rooms); 
    })
}

const getRoomsByNumber = (req, res) => {
    room.find({número: req.params.numero}, function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(rooms); 
    })
}

const deleteRoom = (req, res) => {
    room.deleteOne({número: req.params.numero}, function (err, room) {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(room); 
    })
}


const edit = (req, res) => {
   
    room.findOne({número: req.params.numero}, function (err, rooms) {
        if (err) {
            res.status(400).send(err); 
        }
        if(rooms){
            rooms.lotação = req.body.lotação
            rooms.save()
        }
    })
}


exports.getRoomsByNumber = getRoomsByNumber; 
exports.deleteRoom = deleteRoom; 
exports.getRooms = getRooms; 
exports.createRoom = createRoom;
exports.edit = edit; 



