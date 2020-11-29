const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    description: String,
    cover: String, 
    collections: Array,
})

const library = mongoose.model('library', librarySchema)

module.exports = library;