const mongoose = require('mongoose');


let mongoConnect;

mongoConnect = mongoose.connect('mongodb+srv://fcm_user:Grupo01@fmctour0.9jjb0.mongodb.net/FCM_TOUR?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to mongooose")
})
db.on('error', console.error.bind(console, "connection error: "))


module.exports = mongoConnect