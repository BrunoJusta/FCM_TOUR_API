const mongoose = require('mongoose');

/**
 * @typedef Cart
 * @property {String} email.required
 * @property {String} number.required
 * @property {String} name.required
 * @property {Number} price.required
 * @property {String} img.required
 * 
 */

const cartSchema = new mongoose.Schema({
    email: String,
    number: String,
    name: String,
    price: Number,
    img: String,
})

const cart = mongoose.model('shoppingCarts', cartSchema)

module.exports = cart; 
