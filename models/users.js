/**
 * @typedef Student
 * @property {String} username.require
 * @property {String} password.require
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const user = mongoose.model('tbl_users', userSchema);

module.exports = user; 