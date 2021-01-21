
const mongoose = require('mongoose');

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
