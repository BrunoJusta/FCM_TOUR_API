const museum = require("../models/museum.js");
const sculpture = require("../models/sculpture.js");
const painting = require("../models/painting.js");
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

const getTempByID = (req, res) => {
    museum.find({
        museum
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let temporary = results[0].temporary
            for (let i = 0; i < temporary.length; i++) { 
                if (temporary[i].number == req.params.id) {
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
                                    res.status(200).json(musuems.temporary[i])
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

const getPermaByID = (req, res) => {
    museum.find({
        museum
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let permanent = results[0].permanent
            for (let i = 0; i < permanent.length; i++) {
                if (permanent[i].number == req.params.id) {
                    speech.speeching(permanent[i].description, permanent[i].name).then(result => {
                        if (result) {
                            museum.findOne({
                                museum
                            }, function (err, musuems) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                if (musuems) {
                                    musuems.permanent[i].audio = result
                                    musuems.save();
                                    res.status(200).json(
                                        musuems.permanent[i]
                                    )
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


const getPaintingByID = (req, res) => {
    painting.find({
        painting
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let paintings = results[0]
                if (paintings.number == req.params.id) {
                    console.log(req.params.id)
                    speech.speeching(paintings.description, paintings.name).then(result => {
                        if (result) {
                            painting.findOne({
                                painting
                            }, function (err, paintings) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                if (paintings) {
                                    paintings.audio = result
                                    paintings.save();
                                    res.status(200).json(
                                        paintings
                                    )
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
exports.getTempByID = getTempByID;
exports.getPermaByID = getPermaByID;
exports.getArtistsById = getArtistsById;
exports.getPaintingByID = getPaintingByID;