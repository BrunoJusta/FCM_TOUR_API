const mongoose = require('mongoose');

/**
 * @typedef Room
 * @property {string} number
 * @property {string} name
 * @property {string} description
 * @property {string} description_en
 * @property {string} audio
 * @property {string} audio_en
 * @property {Array} imgs
 * @property {string} cover
 * 
 */

const roomSchema = new mongoose.Schema({
    number: String,
    name: String,
    description: String,
    description_en: String,
    audio: String,
    audio_en: String,
    imgs: Array,
    cover: String
})

const room = mongoose.model('rooms', roomSchema)

module.exports = room; 
