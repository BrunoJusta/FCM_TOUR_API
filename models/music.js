const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    cover: String,
    cupertinos: Array,
    ciclos: Array,
})

const music = mongoose.model('music', musicSchema)

module.exports = music; 