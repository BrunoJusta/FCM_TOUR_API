const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    description: String,
    cover: String, 
    collections: [{
        artistName: String,
        description: String,
        books: Array,
        artistImg: String
    }]
})

const library = mongoose.model('library', librarySchema)

module.exports = library;