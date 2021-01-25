const mongoose = require('mongoose');

/**
 * @typedef Tower
 * @property {string} description
 * @property {string} description_en
 * @property {string} cover
 */

const towerSchema = new mongoose.Schema({
    description: String,
    description_en: String,
    cover: String
})

const tower = mongoose.model('tower', towerSchema)

module.exports = tower;