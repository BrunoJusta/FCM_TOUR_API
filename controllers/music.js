const music = require("../models/music.js");
const speech = require('../API/text2speech')


const getCupertinos = (req, res) => {
    music.find({
        music
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            speech.speeching(results[0].cupertinos.text, "cupertinos").then(result => {
                if (result) {
                    music.findOne({
                        music
                    }, function (err, results) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        if (results) {
                            results.cupertinos.audio = result
                            results.markModified("audio")
                            results.save();
                            res.status(200).json(results.cupertinos)
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



const getCiclos = (req, res) => {
    music.find({
        music
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            speech.speeching(results[0].ciclos.text, "ciclos").then(result => {
                if (result) {
                    music.findOne({
                        music
                    }, function (err, results) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        if (results) {
                            results.ciclos.audio = result
                            results.markModified("audio")
                            results.save();
                            res.status(200).json(results.ciclos)
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


exports.getCupertinos = getCupertinos;
exports.getCiclos = getCiclos;