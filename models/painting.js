const mongoose = require('mongoose');

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