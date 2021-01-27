const museum = require("../models/museum.js");
const sculpture = require("../models/sculpture.js");
const painting = require("../models/painting.js");
const speech = require("../API/text2speech.js");
const {
    param
} = require("express-validator");
const { language } = require("googleapis/build/src/apis/language");



const getMuseum = (req, res) => {
    museum.find({
        museum
    }, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.headers.language == "EN") {
                res.status(200).json({
                    description: result[0].description_en,
                    cover: result[0].cover,
                    permanent: result[0].permanent,
                    temporary: result[0].temporary,
                })
            } else {
                res.status(200).json({
                    description: result[0].description,
                    cover: result[0].cover,
                    permanent: result[0].permanent,
                    temporary: result[0].temporary,
                })

            }
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
            let language = req.headers.language
            let temporary = results[0].temporary
            for (let i = 0; i < temporary.length; i++) {
                if (temporary[i].number == req.params.id) {
                    if (language == "EN" && temporary[i].audio_en != '') {
                        res.status(200).json({
                            number: temporary[i].number,
                            audio: temporary[i].audio_en,
                            img: temporary[i].img,
                            name: temporary[i].name,
                            description: temporary[i].description_en
                        })
                    } else if (language == "PT" && temporary[i].audio != '') {
                        res.status(200).json({
                            number: temporary[i].number,
                            audio: temporary[i].audio,
                            img: temporary[i].img,
                            name: temporary[i].name,
                            description: temporary[i].description
                        })
                    } else {
                        let description
                        if (language == "EN") description = temporary[i].description_en
                        else description = temporary[i].description
                        let tempName = temporary[i].name
                        speech.speeching(description, tempName.replace(/\s/g, ''), language).then(result => {
                            if (result) {
                                museum.findOne({
                                    museum
                                }, function (err, musuems) {
                                    if (err) {
                                        res.status(400).send(err);
                                    }
                                    if (musuems) {

                                        if (language == "EN") {
                                            musuems.temporary[i].audio_en = result
                                            musuems.markModified("audio_en")
                                            musuems.save();
                                            res.status(200).json({
                                                number: musuems.temporary[i].number,
                                                audio: musuems.temporary[i].audio_en,
                                                img: musuems.temporary[i].img,
                                                name: musuems.temporary[i].name,
                                                description: musuems.temporary[i].description_en
                                            })
                                        } else{
                                            musuems.temporary[i].audio = result
                                            musuems.markModified("audio")
                                            musuems.save();
                                            res.status(200).json({
                                                number: musuems.temporary[i].number,
                                                audio: musuems.temporary[i].audio,
                                                img: musuems.temporary[i].img,
                                                name: musuems.temporary[i].name,
                                                description: musuems.temporary[i].description
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
            let language = req.headers.language
            let permanent = results[0].permanent
            for (let i = 0; i < permanent.length; i++) {
                if (permanent[i].number == req.params.id) {
                    if (language == "EN" && permanent[i].audio_en != '') {
                        res.status(200).json({
                            number: permanent[i].number,
                            audio: permanent[i].audio_en,
                            img: permanent[i].img,
                            name: permanent[i].name,
                            description: permanent[i].description_en
                        })
                    } else if (language == "PT" && permanent[i].audio != '') {
                        res.status(200).json({
                            number: permanent[i].number,
                            audio: permanent[i].audio,
                            img: permanent[i].img,
                            name: permanent[i].name,
                            description: permanent[i].description
                        })
                    } else {
                        let description
                        if (language == "EN") description = permanent[i].description_en
                        else description = permanent[i].description
                        let tempName = permanent[i].name
                        speech.speeching(description, tempName.replace(/\s/g, ''), language).then(result => {
                            if (result) {
                                museum.findOne({
                                    museum
                                }, function (err, musuems) {
                                    if (err) {
                                        res.status(400).send(err);
                                    }
                                    if (musuems) {

                                        if (language == "EN") {
                                            musuems.permanent[i].audio_en = result
                                            musuems.markModified("audio_en")
                                            musuems.save();
                                            res.status(200).json({
                                                number: musuems.permanent[i].number,
                                                audio: musuems.permanent[i].audio_en,
                                                img: musuems.permanent[i].img,
                                                name: musuems.permanent[i].name,
                                                description: musuems.permanent[i].description_en
                                            })
                                        } else {
                                            musuems.permanent[i].audio = result
                                            musuems.markModified("audio")
                                            musuems.save();
                                            res.status(200).json({
                                                number: musuems.permanent[i].number,
                                                audio: musuems.permanent[i].audio,
                                                img: musuems.permanent[i].img,
                                                name: musuems.permanent[i].name,
                                                description: musuems.permanent[i].description
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
            }
        }
    })
}


const getPaintingByID = (req, res) => {
    painting.find({
        number: req.params.id
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let language = req.headers.language
            let paintings = results[0]
            if (language == "EN" && paintings.audio_en != '') {
                res.status(200).json({
                    number: paintings.number,
                    audio: paintings.audio_en,
                    img: paintings.img,
                    name: paintings.name,
                    description: paintings.description_en
                })
            } else if (language == "PT" && paintings.audio != '') {
                res.status(200).json({
                    number: paintings.number,
                    audio: paintings.audio,
                    img: paintings.img,
                    name: paintings.name,
                    description: paintings.description
                })
            }
            else{
                let description
                if (language == "EN") description = paintings.description_en
                else description = paintings.description
                let paintName = paintings.name
                speech.speeching(paintings.description, paintName.replace(/\s/g, ''), language).then(result => {
                    if (result) {
                        painting.findOne({
                            painting
                        }, function (err, paintings) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            if (paintings) {

                                if (language == "EN") {
                                    paintings.audio_en = result
                                    paintings.markModified("audio_en")
                                    paintings.save();
                                    res.status(200).json({
                                        number: paintings.number,
                                        audio: paintings.audio_en,
                                        img: paintings.img,
                                        name: paintings.name,
                                        description:paintings.description_en
                                    })
                                } else{
                                    paintings.audio = result
                                    paintings.markModified("audio")
                                    paintings.save();
                                    res.status(200).json({
                                        number: paintings.number,
                                        audio: paintings.audio,
                                        img: paintings.img,
                                        name: paintings.name,
                                        description: paintings.description
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




exports.getMuseum = getMuseum;
exports.getSculptures = getSculptures;
exports.getTempByID = getTempByID;
exports.getPermaByID = getPermaByID;
exports.getPaintingByID = getPaintingByID;