const mongoose = require('mongoose');

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
