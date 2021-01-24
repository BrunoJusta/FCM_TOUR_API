require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const user = require('./routes/users.js')
const museum = require('./routes/museum.js')
const music = require('./routes/music.js')
const roulette = require('./routes/roulette.js')
const tower = require('./routes/tower.js')
const library = require('./routes/library.js')
const home = require('./routes/home.js')
const utilities = require('./middleware/utilities.js');
const passport = require('passport')
const cors = require("cors");
const ticket = require('./routes/qrCode')
const quizz = require('./routes/quizz')
const products = require('./routes/products')
const orders = require('./routes/orders.js')
const carts = require('./routes/cart.js')

const mongoBD = require('./database/db-config.js')



// Swagger
const expressSwagger = require('express-swagger-generator')(app);
const options = require('./swagger_conf');
expressSwagger(options);



app.use(cors({
    origin: '*'
}));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})



const auth = function (req, res, next) {
    console.log(utilities.exceptions.indexOf(req.url) >= 0)
    if (req.url.indexOf("/quizz") != -1 || req.url.indexOf("/roleta") != -1 || req.url.indexOf("/spin") != -1 || req.url.indexOf("/points") != -1 || req.url.indexOf("/produtos") != -1 || req.url.indexOf("/encomenda") != -1) {
        utilities.validateToken(req.headers.authorization, (result) => {
            if (result) {
                next();
            } else {
                res.status(401).send("Invalid Token");
            }
        })
    } else {
        next();
    }
}


app.use(passport.initialize());
app.use(express.json());
app.use(auth)
app.use('/quizz', quizz)
app.use('/', user)
app.use('/museu', museum)
app.use('/musica', music)
app.use('/torre', tower)
app.use('/roleta', roulette)
app.use('/biblioteca', library)
app.use('/home', home)
app.use('/ticket', ticket)
app.use('/produtos', products)
app.use('/encomenda', orders)
app.use('/carrinho', carts)

app.listen(port, () => {
    console.log("Servidor a correr na porta " + port)
})