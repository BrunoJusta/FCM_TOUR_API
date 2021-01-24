const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    number:Number,
    email: String,
    products: Array,
    adress: String,
    zipCode: String,
    city: String,
    name: String,
    contact: String,
    total: Number,
    state: Number
})

const order = mongoose.model('orders', orderSchema)

module.exports = order; 
