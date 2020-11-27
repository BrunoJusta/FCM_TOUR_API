const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
    desccription: String,
    cover: String,
    temporary: Array,
    permanent: Array,
    artists: Object
})

const museum = mongoose.model('museum', museumSchema)

module.exports = museum; 