require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const mongoose = require('mongoose');
const salas = require('./routes/rooms')
const user = require('./routes/users.js')
const museum = require('./routes/museum.js')
const music = require('./routes/music.js')
const roulette = require('./routes/roulette.js')
const tower = require('./routes/tower.js')
const library = require('./routes/library.js')
const utilities = require('./utilities/utilities.js');
const firebase = require('firebase');

// FireBase
//app = firebase.initializeApp({
  //  apiKey: "AIzaSyDecuyoFEMMyqc_YLX_5b-oM_btYI9HEQc",
    //authDomain: "fcmtour-347cf.firebaseapp.com",
    //projectId: "fcmtour-347cf",
    //storageBucket: "fcmtour-347cf.appspot.com",
    //messagingSenderId: "993641904076",
    //appId: "1:993641904076:web:8cb25caa29f05e50034f69",
    //measurementId: "G-FV1C9VGR6T"
  //})

// Swagger
const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./swagger_conf'); 
expressSwagger(options); 



const auth = function(req, res, next) {
    console.log(req.url)
     if(utilities.exceptions.indexOf(req.url) >= 0 || req.url.indexOf('login?code') != -1)  {
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


mongoose.connect('mongodb+srv://fcm_user:Grupo01@fmctour0.9jjb0.mongodb.net/FCM_TOUR?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to mongooose")
})
db.on('error', console.error.bind(console, "connection error: "))

app.use(express.json());
app.use(auth)
app.use('/salas', salas)
app.use('/', user)
app.use('/museu', museum)
app.use('/musica', music)
app.use('/utilizadores', user)
app.use('/torre', tower)
app.use('/roleta', roulette)
app.use('/livraria', library)



app.listen(port, () => {
    console.log("Servidor a correr na porta " + port)
})