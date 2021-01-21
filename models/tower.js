const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
    description: String,
    description_en: String,
    cover: String
})

const tower = mongoose.model('tower', towerSchema)

module.exports = tower;