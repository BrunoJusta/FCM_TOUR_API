const mongoose = require('mongoose');

/**
 * @typedef Museum
 * @property {String} description
 * @property {String} description_en
 * @property {String} cover
 * @property {Array} temporary
 * @property {Array} permanent
 * 
 */

const museumSchema = new mongoose.Schema({
    description: String,
    description_en:String,
    cover: String,
    temporary: [{
        name: String,
        description: String,
        description_en:String,
        audio: String,
        audio_en: String,
        img: String,
        number: String
    }],
    permanent: [{
        name: String,
        description: String,
        description_en:String,
        audio: String,
        audio_en: String,
        img: String,
        number: String
    }],
})

const museum = mongoose.model('museum', museumSchema)

module.exports = museum;