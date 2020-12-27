/**
 * @typedef User
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} email.required
 * @property {string} points.required
 * @property {string} img.required
 * 
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    points: String,
    img: String,
    type:Number
    
});

const user = mongoose.model('user', userSchema);

module.exports = user; 


//Type
//Normal - 01 X
//Google - 02 X
//Facebook - 03
//Normal + Google - 04 x
//Normal + Facebook - 05 
//Normal + Google+ Facebook - 06 x
//Google + Facebook - 07 x