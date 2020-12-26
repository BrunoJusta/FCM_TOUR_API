const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
    description: String,
    cover: String,
    temporary: [{name: String, description: String, audio: String}],
    permanent: Array,
    artists: Object,
    audio: String
})

const museum = mongoose.model('museum', museumSchema)

module.exports = museum; 