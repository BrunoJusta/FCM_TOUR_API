
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    points: String,
    img: String
    
});

const user = mongoose.model('user', userSchema);

module.exports = user; 