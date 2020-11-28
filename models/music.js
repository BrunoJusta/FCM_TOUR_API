/**
 * @typedef Music
 * @property {string} cover.required
 * @property {Array} cupertinos.required
 * @property {Array} ciclos.required
 * 
 */

const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    cover: String,
    cupertinos: Array,
    ciclos: Array,
})

const music = mongoose.model('music', musicSchema)

module.exports = music; 