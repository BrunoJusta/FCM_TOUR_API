
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    piso: Number,
    número: Number,
    lotação: Number,
    ocupada: Boolean
})

const room = mongoose.model('salas_ocupadas', roomSchema)

module.exports = room; 
