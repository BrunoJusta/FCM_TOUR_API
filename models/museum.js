const mongoose = require('mongoose');

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