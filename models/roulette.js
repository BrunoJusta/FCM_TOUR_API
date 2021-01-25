const mongoose = require('mongoose');

/**
 * @typedef Sculpture
 * @property {Array} prizes
 * @property {Array} items
 */

const rouletteSchema = new mongoose.Schema({
    prizes:Array,
    items: Array,
})

const roulette = mongoose.model('roulette', rouletteSchema)

module.exports = roulette; 