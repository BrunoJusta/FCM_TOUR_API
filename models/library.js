const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    description: String,
    cover: String, 
    acervos: [{
        name: String,
        description: String,
        audio: String,
        img: String,
        number: String

    }]
})

const library = mongoose.model('library', librarySchema)

module.exports = library;