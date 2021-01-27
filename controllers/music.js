const music = require("../models/music.js");
const speech = require('../API/text2speech')


const getMusic = (req, res) => {
    music.find(function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(results)
        }
    })
}





const getCupertinos = (req, res) => {
    music.find({
        music
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let language = req.headers.language
            let cupertinos = results[0].cupertinos
            if (language == "EN" && cupertinos.audio_en != '') {
                res.status(200).json({
                    audio: cupertinos.audio_en,
                    img: cupertinos.img,
                    text: cupertinos.text,
                    description: cupertinos.description_en
                })
            } else if (language == "PT" && cupertinos.audio != '') {
                res.status(200).json({
                    audio: cupertinos.audio,
                    img: cupertinos.img,
                    text: cupertinos.text,
                    description: cupertinos.description
                })
            } else {
                let description 
                if(language == "EN" ) description = cupertinos.description_en
                else description = cupertinos.description
                speech.speeching(description, "cupertinos", language).then(result => {
                    if (result) {
                        music.findOne({
                            music
                        }, function (err, results) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            if (results) {
                                if(language == "EN"){
                                    results.cupertinos.audio_en = result
                                    results.markModified("audio_en")
                                    results.save();
                                    res.status(200).json({
                                        audio: results.cupertinos.audio_en,
                                        img: results.cupertinos.img,
                                        text: results.cupertinos.text,
                                        description: results.cupertinos.description_en
                                    })
                                }
                                else if (language == "PT") {
                                    results.cupertinos.audio = result
                                    results.markModified("audio")
                                    results.save();
                                    res.status(200).json({
                                        audio: results.cupertinos.audio,
                                        img: results.cupertinos.img,
                                        text: results.cupertinos.text,
                                        description: results.cupertinos.description
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



const getCiclos = (req, res) => {
    music.find({
        music
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {let language = req.headers.language
            let ciclos = results[0].ciclos
            if (language == "EN" && ciclos.audio_en != '') {
                res.status(200).json({
                    audio: ciclos.audio_en,
                    img: ciclos.img,
                    text: ciclos.text,
                    description: ciclos.description_en
                })
            } else if (language == "PT" && ciclos.audio != '') {
                res.status(200).json({
                    audio: ciclos.audio,
                    img: ciclos.img,
                    text: ciclos.text,
                    description: ciclos.description
                })
            } else {
                let description 
                if(language == "EN" ) description = ciclos.description_en
                else description = ciclos.description
                speech.speeching(description, "ciclos", language).then(result => {
                    if (result) {
                        music.findOne({
                            music
                        }, function (err, results) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            if (results) {
                                if(language == "EN"){
                                    results.ciclos.audio_en = result
                                    results.markModified("audio_en")
                                    results.save();
                                    res.status(200).json({
                                        audio: results.ciclos.audio_en,
                                        img: results.ciclos.img,
                                        text: results.ciclos.text,
                                        description: results.ciclos.description_en
                                    })
                                }
                                else if(language == "PT") {
                                    results.ciclos.audio = result
                                    results.markModified("audio")
                                    results.save();
                                    res.status(200).json({
                                        audio: results.ciclos.audio,
                                        img: results.ciclos.img,
                                        text: results.ciclos.text,
                                        description: results.ciclos.description
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


exports.getCupertinos = getCupertinos;
exports.getCiclos = getCiclos;
exports.getMusic = getMusic;