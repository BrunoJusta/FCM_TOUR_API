
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: String,
    name: String,
    description: String,
    audio: String,
    imgs: Array
})

const room = mongoose.model('rooms', roomSchema)

module.exports = room; 
