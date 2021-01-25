const mongoose = require('mongoose');

/**
 * @typedef Library
 * @property {String} description
 * @property {String} description_en
 * @property {String} cover
 * @property {Array} acervos
 */
const librarySchema = new mongoose.Schema({
    description: String,
    description_en: String,
    cover: String, 
    acervos: [{
        name: String,
        description: String,
        audio: String,
        img: String,
        number: String,
        description_en: String,
        audio_en: String,
    }]
})

const library = mongoose.model('library', librarySchema)

module.exports = library;