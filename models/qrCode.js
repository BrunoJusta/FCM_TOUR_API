const mongoose = require('mongoose');

/**
 * @typedef qrCode
 * @property {string} code.required
 * @property {String} date.required
 */


const qrCodeSchema = new mongoose.Schema({
    code: String,
    date: String
})

const qr = mongoose.model('tickets', qrCodeSchema)

module.exports = qr;