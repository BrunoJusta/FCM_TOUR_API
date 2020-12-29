const mongoose = require('mongoose');

const googleTokenSchema = new mongoose.Schema({
    code: String,
    access_token: String,
    bearer: String,
});

const googleToken = mongoose.model('google_tokens', googleTokenSchema);

module.exports = googleToken; 
