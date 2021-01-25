const library = require('../models/library.js')
const speech = require("../API/text2speech.js");


const getLibrary = (req, res) => {
    library.find({library}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            if (req.headers.language == "EN") {
                res.status(200).json({
                    description: result[0].description_en,
                    cover: result[0].cover,
                    acervos: result[0].acervos,
                })
            } else {
                res.status(200).json({
                    description: result[0].description,
                    cover: result[0].cover,
                    acervos: result[0].acervos,
                })

            }
        }
    })
}

const getCollections = (req, res) => {
    library.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }else{
            let collection = result[0].acervos
            res.status(200).json(collection)
        }
    })
}

const getCollectionsByID = (req, res) => {
    library.find({
        library
    }, function (err, results) {
        if (err) {
            res.status(400).send(err);
        } else {
            let language = req.headers.language
            let collection = results[0].acervos
            for (let i = 0; i < collection.length; i++) { 
                if (collection[i].number == req.params.id) {
                    if(language == "EN" && collection[i].audio_en != ''){
                        res.status(200).json({
                            number: collection[i].number,
                            audio: collection[i].audio_en,
                            img: collection[i].img,
                            name: collection[i].name,
                            description: collection[i].description_en
                        })
                    }
                    else if(collection[i].audio != '' ){
                        res.status(200).json({
                            number: collection[i].number,
                            audio: collection[i].audio,
                            img: collection[i].img,
                            name: collection[i].name,
                            description: collection[i].description
                        })
                    }else{
                    let description 
                    if(language == "EN" ) description = collection[i].description_en
                    else description = collection[i].description
                    let colName = collection[i].name
                    speech.speeching(description, colName.replace(/\s/g, ''), language).then(result => {
                        if (result) {
                            library.findOne({
                                library
                            }, function (err, resultCol) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                if (resultCol) {
                                    if(language == "EN"){
                                        resultCol.acervos[i].audio_en = result
                                        resultCol.markModified("audio_en")
                                        resultCol.save();
                                        res.status(200).json({
                                            number: resultCol.acervos[i].number,
                                            audio: resultCol.acervos[i].audio_en,
                                            img: resultCol.acervos[i].img,
                                            name: resultCol.acervos[i].name,
                                            description: resultCol.acervos[i].description_en
                                        })
                                    }
                                    else{
                                        resultCol.acervos[i].audio = result
                                        resultCol.markModified("audio")
                                        resultCol.save();
                                        res.status(200).json({
                                            number: resultCol.acervos[i].number,
                                            audio: resultCol.acervos[i].audio,
                                            img: resultCol.acervos[i].img,
                                            name: resultCol.acervos[i].name,
                                            description: resultCol.acervos[i].description
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

exports.getLibrary = getLibrary;
exports.getCollections = getCollections;
exports.getCollectionsByID = getCollectionsByID;