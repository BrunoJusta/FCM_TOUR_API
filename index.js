require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const salas = require('./routes/rooms')
const user = require('./routes/users.js')
const museum = require('./routes/museum.js')
const music = require('./routes/music.js')
const roulette = require('./routes/roulette.js')
const tower = require('./routes/tower.js')
const library = require('./routes/library.js')
const home = require('./routes/home.js')
const utilities = require('./utilities/utilities.js');
const passport = require('passport')
const mongoBD = require('./database/db-config.js')



// Swagger
const expressSwagger = require('express-swagger-generator')(app);
const options = require('./swagger_conf');
expressSwagger(options);



const auth = function (req, res, next) {
    console.log(req.url)
    if (utilities.exceptions.indexOf(req.url) >= 0 || req.url.indexOf('login?code') != -1 || req.url.indexOf(`auth/facebook`)) {
        next();
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if (result) {
                next();
            } else {
                res.status(401).send("Invalid Token");
            }
        })
    }
}


app.use(passport.initialize());
app.use(express.json());
app.use(auth)
app.use('/torre', salas)
app.use('/', user)
app.use('/museu', museum)
app.use('/musica', music)
app.use('/utilizadores', user)
app.use('/torre', tower)
app.use('/roleta', roulette)
app.use('/biblioteca', library)
app.use('/home', home)


app.listen(port, () => {
    console.log("Servidor a correr na porta " + port)
})