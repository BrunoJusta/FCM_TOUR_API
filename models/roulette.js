const mongoose = require('mongoose');

const rouletteSchema = new mongoose.Schema({
    prizes:Array,
    items: Array,
})

const roulette = mongoose.model('roulette', rouletteSchema)

module.exports = roulette; 