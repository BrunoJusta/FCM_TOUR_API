var jwt = require('jsonwebtoken');
const {google} = require('googleapis');

const generateToken = (user_info, callback) => {
    let secret = process.env.SECRET; 
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}

const validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    let secret = process.env.SECRET; 
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        if(error) {
            return callback(false);
        } else {
            return callback(true)
        }
    })
}


const googleConfig = {
    clinetId: '817455743730-8aptanrqdh06q6aje2jhdp7i30l38mo8.apps.googleusercontent.com',
    clientSecret: 'DJP8a958Jg1nlbNf1V3EpV5T',
    redirect: 'http://localhost:3000/login'
}

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',

]

const createConnection = () => {
    return new google.auth.OAuth2(
        googleConfig.clinetId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}


const getConnectionUrl = (auth) => {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}

const urlGoogle = () => {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

const getTokens = (code, callback) =>{
    const auth = createConnection();
    auth.getToken(code).then(tokens =>{
        console.log(tokens)
        if(!tokens.tokens){
return callback(true, "Error")
        }else{
            return callback(false, tokens.tokens)
        }
    })
}

const getUserInfo = (access_token, callback) => {
    let client = new google.auth.OAuth2(googleConfig.clinetId)
    client.setCredentials({access_token: access_token})
    var oauth2 = google.oauth2({
        auth: client,
        version: 'v2'
    })
    oauth2.userinfo.get(
        function(err, result){
            if(err){
                return callback(true, err)
            } else {
                return callback(false, result.data)
            }
        })
}

const validateTokenGoogle = (token, callback) => {
    let client = new google.auth.OAuth2(googleConfig.clinetId)
    async function verify() {
        let ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleConfig.clinetId

        })

        let payload = ticket.getPayload();
        return callback(false,payload)
    }

    verify().catch(error => {

    })
}

const exceptions = ['/','/login', '/torre',  '/register', '/museu', '/musica', '/musica/cupertinos', '/roleta', '/roleta/girar']




exports.generateToken = generateToken
exports.validateToken = validateToken
exports.exceptions = exceptions
exports.urlGoogle = urlGoogle
exports.getTokens = getTokens
exports.getUserInfo = getUserInfo
exports.validateTokenGoogle = validateTokenGoogle
