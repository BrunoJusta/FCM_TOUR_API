
const uuid = require('uuid-v4');
const tower = require('../models/tower.js')

function send(name){

  console.log(name)
  const {Storage} = require('@google-cloud/storage');

  const storage = new Storage({
    keyFilename: "./API/fcmtour-347cf-firebase-adminsdk-qmqn9-d61fffd41e.json"
  });
  
  let bucketName = "fcmtour-347cf.appspot.com"
  let file_name = name + ".mp3";
  
   const uploadFile = async()  => {
    await storage.bucket(bucketName).upload(file_name, {
      gzip:true,
      metadata:{
        contentType: 'audio/mpeg',
        metadata:{
          firebaseStorageDownloadTokens: uuid()
        }
      
      },
      
    });
    
  }
  
  uploadFile();

  let Url = "https://firebasestorage.googleapis.com/v0/b/" + bucketName + "/o/" + file_name + "?alt=media"

  let collection = name

  tower.findOne({tower}, function (err, result) {
    if (err) {
        res.status(400).send(err); 
    }
    if(result){
      for(let i=0; i<result.rooms.length; i++){
        let name2 = result.rooms[i].name
       

        if(name == name2){
          result.rooms[i].audio = Url
      console.log(result.rooms[i].audio)
      result.save()
         
        } 
        
        console.log(result.save() )

    }

  
    }
})
}


exports.send = send














/* async function send(filename, name) {



  var admin = require("firebase-admin");

  var serviceAccount = require("./fcmtour-347cf-firebase-adminsdk-qmqn9-d61fffd41e.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  

  const {
    Storage
  } = require('@google-cloud/storage');
  const storage = new Storage();
  const bucket = storage.bucket('fcmtour-347cf.appspot.com')
  var file = bucket.file('image/' + name + ".mp3");

  console.log("sending...")
  const options = { // construct the file to write
    metadata: {
      contentType: 'audio/mpeg',
      metadata: {
        source: 'Google Text-to-Speech'
      }
    }
  };
  return await file.save(filename, options)
    .then(() => {
      console.log("File written to Firebase Storage.")
      return;
    })
    .catch((error) => {
      console.error(error);
    });


}


 */