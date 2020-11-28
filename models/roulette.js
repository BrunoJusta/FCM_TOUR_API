const mongoose = require('mongoose');

const rouletteSchema = new mongoose.Schema({
    prizes:Object,
    items: Array,
})

const rouletteSchema = mongoose.model('roulette', rouletteSchema)

module.exports = roulette; 