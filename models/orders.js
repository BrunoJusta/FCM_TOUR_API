const mongoose = require('mongoose');

/**
 * @typedef Order
 * @property {Number} number.required
 * @property {String} email.required
 * @property {Array} products.required
 * @property {String} adress.required
 * @property {String} zipCode.required
 * @property {String} city.required
 * @property {String} name.required
 * @property {Number} total.required
 * @property {Number} state.required
 * 
 */

const orderSchema = new mongoose.Schema({
    number:Number,
    email: String,
    products: Array,
    adress: String,
    zipCode: String,
    city: String,
    name: String,
    total: Number,
    state: Number
})

const order = mongoose.model('orders', orderSchema)

module.exports = order; 
