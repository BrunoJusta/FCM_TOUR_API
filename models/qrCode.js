const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    code: String,
    date: String
})

const qr = mongoose.model('tickets', qrCodeSchema)

module.exports = qr;