const mongoose = require('mongoose');

/**
 * @typedef Home
 * @property {String} description
 * @property {String} description_en
 * @property {String} cover
 */

const homeSchema = new mongoose.Schema({
    description: String,
    description_en: String,
    cover: String, 
})

const library = mongoose.model('homes', homeSchema)

module.exports = library;