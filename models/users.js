const mongoose = require('mongoose');

/**
 * @typedef User
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} email.required
 * @property {string} points.required
 * @property {string} img.required
 * @property {Number} type.required
 * @property {string} date.required
 */

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    points: String,
    img: String,
    type:Number,
    date: String
    
});

const user = mongoose.model('user', userSchema);

module.exports = user; 
