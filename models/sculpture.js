
const mongoose = require('mongoose');

const sculptureSchema = new mongoose.Schema({
    name: String,
    imgs: String,
    link: String
})

const room = mongoose.model('sculptures', sculptureSchema)

module.exports = room; 
