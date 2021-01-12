var jwt = require('jsonwebtoken');

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
            return callback(true)
        }
    })
}



const exceptions = ['/', '/login', '/auth/facebook', '/auth/facebook/callback', '/torre', '/register', '/museu', '/musica', '/musica/cupertinos', '/roleta', '/roleta/girar']




exports.generateToken = generateToken
exports.validateToken = validateToken
exports.exceptions = exceptions