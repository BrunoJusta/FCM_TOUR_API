const library = require('../models/library.js')
const speech = require("../API/text2speech.js");


const getLibrary = (req, res) => {
    library.find({library}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(result)
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
            let collection = results[0].acervos
            for (let i = 0; i < collection.length; i++) { 
                if (collection[i].number == req.params.id) {
                    let colName = collection[i].name
                    speech.speeching(collection[i].description, colName.replace(/\s/g, '')).then(result => {
                        if (result) {
                            library.findOne({
                                library
                            }, function (err, resultCol) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                if (resultCol) {
                                    resultCol.acervos[i].audio = result
                                    resultCol.save();
                                    res.status(200).json(resultCol.acervos[i])
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

exports.getLibrary = getLibrary;
exports.getCollections = getCollections;
exports.getCollectionsByID = getCollectionsByID;