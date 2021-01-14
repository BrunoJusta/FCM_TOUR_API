const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    name: String,
    description: String,
    audio: String,
    img: String,
    number: String
})

const painting = mongoose.model('paintings', paintingSchema)

module.exports = painting;