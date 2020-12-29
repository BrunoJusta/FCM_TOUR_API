const mongoose = require('mongoose');

const FacebookTokenSchema = new mongoose.Schema({
    code: String,
    access_token: String,
    bearer: String,
});

const facebookToken = mongoose.model('facebook_tokens', FacebookTokenSchema);

module.exports = facebookToken;