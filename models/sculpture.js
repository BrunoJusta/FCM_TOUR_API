const mongoose = require('mongoose');

/**
 * @typedef Sculpture
 * @property {string} name.required
 * @property {string} imgs.required
 * @property {string} link.required
 */

const sculptureSchema = new mongoose.Schema({
    name: String,
    imgs: String,
    link: String
})

const room = mongoose.model('sculptures', sculptureSchema)

module.exports = room; 
