/**
 * @typedef Music
 * @property {string} cover.required
 * @property {Array} cupertinos.required
 * @property {Array} ciclos.required
 * 
 */

const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    cupertinos: {
        text: String,
        audio: String,
        img: String,
        concerts: Array
    },
    ciclos: {
        text: String,
        audio: String,
        img: String
    }
})

const music = mongoose.model('music', musicSchema)

module.exports = music; 