const museum = require("../models/museum.js");
const sculpture = require("../models/sculpture.js");
const speech = require("../API/text2speech.js");



const getMuseum = (req, res) => {
    museum.find({
        museum
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(results)
        }
    })
}


const getSculptures = (req, res) => {
    sculpture.find({
        sculpture
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(results)
        }
    })
}

const getTempByName = (req, res) => {
    museum.find({
        museum
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let temporary = results[0].temporary
            for (let i = 0; i < temporary.length; i++) {
                if (temporary[i].name == req.params.name) {
                    speech.speeching(temporary[i].description, temporary[i].name).then(result => {
                        if (result) {
                            museum.findOne({
                                museum
                            }, function (err, musuems) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                if (musuems) {
                                    musuems.temporary[i].audio = result
                                    musuems.save();
                                    res.status(200).json({
                                        musuem: musuems.temporary,
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
            }
        }
    })
}

const getArtistsById = (req, res) => {
    museum.find({
        museum
    }, function (err, result) {
        artists = []
        if (err) {
            res.status(400).send(err);
        } else {
            for (let i = 0; i < result[0].artists.length; i++) {
                if (result[0].artists[i].id == req.params.id) {
                    artists.push(result[0].artists[i].name)
                }
            }
            res.status(200).json(artists)
        }
    })
}

exports.getMuseum = getMuseum;
exports.getSculptures = getSculptures;
exports.getTempByName = getTempByName;
exports.getArtistsById = getArtistsById;