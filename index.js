require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const salas = require('./routes/rooms')
const users = require('./routes/users.js')
const utilities = require('./utilities/utilities.js')

//Swagger
const expressSwagger = require('express-swagger-generator')(app)
const options = require('./swagger_conf')
expressSwagger(options)

app.use(express.json());


const auth = function(req, res, next) {
    let exceptions = ['/login', '/register']; 
    if(exceptions.indexOf(req.url) >= 0) {
        next(); 
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if(result) {
                next(); 
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    }
}


mongoose.connect('mongodb+srv://tsiw:GAa8xvmV3eKrVa8C@cluster0.b0vmz.mongodb.net/TSIW?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to mongooose")
})
db.on('error', console.error.bind(console, "connection error: "))


app.use(auth)

app.use('/salas', salas)
app.use('/', users)

app.listen(port, () => {
    console.log("Servidor a correr na porta " + port)
})