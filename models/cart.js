const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: String,
    number: String,
    name: String,
    price: Number,
    img: String,
})

const cart = mongoose.model('shoppingCarts', cartSchema)

module.exports = cart; 
