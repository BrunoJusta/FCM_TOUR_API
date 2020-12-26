const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
    description: String,
    cover: String,
    temporary: [{
        name: String,
        description: String,
        audio: String
    }],
    permanent: [{
        name: String,
        description: String,
        audio: String
    }],
    artists: [{
        id: String,
        name: String
    }],
    audio: String
})

const museum = mongoose.model('museum', museumSchema)

module.exports = museum;