const mongoose = require('mongoose');

/**
 * @typedef Painting
 * @property {String} name.required
 * @property {String} description.required
 * @property {String} description_en.required
 * @property {String} audio.required
 * @property {String} audio_en.required
 * @property {String} img.required
 * @property {String} number.required
 * 
 */
const paintingSchema = new mongoose.Schema({
    name: String,
    description: String,
    audio: String,
    description_en: String,
    audio_en: String,
    img: String,
    number: String
})

const painting = mongoose.model('paintings', paintingSchema)

module.exports = painting;