const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    description: String,
    cover: String, 
})

const library = mongoose.model('homes', homeSchema)

module.exports = library;