const mongoose = require('mongoose');

/**
 * @typedef Product
 * @property {string} number.required
 * @property {string} name.required
 * @property {Number} price.required
 * @property {String} description.required
 * @property {String} description_en.required
 * @property {String} img.required
 */

const productSchema = new mongoose.Schema({
    number: String,
    name: String,
    price: Number,
    description: String,
    description_en: String,
    img: String,
})

const product = mongoose.model('products', productSchema)

module.exports = product; 
