const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
    description: String,
    cover: String, 
    rooms: Array,
    tickets: Array,
    url: String
})

const tower = mongoose.model('tower', towerSchema)

module.exports = tower;