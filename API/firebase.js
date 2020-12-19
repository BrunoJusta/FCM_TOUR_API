
const {Storage} = require('@google-cloud/storage');

const express = require('express')

const app = new express()


const storage = new Storage({
  keyFilename: "./fcmtour-347cf-firebase-adminsdk-qmqn9-d61fffd41e.json"
});

let bucketName = "fcmtour-347cf.appspot.com"
let file_name = "./museu.mp3";

const uploadFile = async()  => {
  await storage.bucket(bucketName).upload(file_name, {
    gzip:true,
    metadata:{
      cacheControl: 'public, max-age=31536000',
    },
  });

  console.log("lets goooooo")



}


uploadFile();

app.listen(8088, () => {console.log('server running')})















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


exports.send = send */