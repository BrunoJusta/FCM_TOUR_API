var jwt = require('jsonwebtoken');
const users = require("../models/users.js");

const generateToken = (user_info, callback) => {
    let secret = process.env.SECRET;
    let token = jwt.sign({
        data: user_info,
    }, secret, {
        expiresIn: '24h'
    });
    return callback(token);
}

const validateToken = (token, callback) => {
    if (!token) {
        return callback(false);
    }
    let secret = process.env.SECRET;
    jwt.verify(token.replace('Bearer ', ''), secret, function (error, decoded) {
        if (error) {
            return callback(false);
        } else {
            const userEmail = decoded.data.email
            console.log(userEmail);
            users.find({
                email: userEmail
            }, function (err, user) {
                if (err) {
                    return callback(false);
                }
                if (user) {
                    return callback(true)
                }
            })
        }
    })
}



const exceptions = ['/points?', '/spin?', '/roleta', '/roleta/girar', '/roleta/premios', 'roleta/premios?', '/quizz']




exports.generateToken = generateToken
exports.validateToken = validateToken
exports.exceptions = exceptions