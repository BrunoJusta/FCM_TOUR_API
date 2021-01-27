const uuid = require('uuid-v4');
const keyFilename = './API/fcmtour-347cf-firebase-adminsdk-qmqn9-ea3fd2d083.json'
const {Storage} = require('@google-cloud/storage');
const users = require("../models/users.js");
const storage = new Storage({
  projectId: 'fcmtour-347cf',
  keyFilename: keyFilename
});
let bucketName = "fcmtour-347cf.appspot.com"
const bucket = storage.bucket(bucketName);


async function uploadImage(res, email, image, name, type) {

  console.log("SIGA")
  
  var file = bucket.file(image.originalname + "_" +Date.now());

  const blobWriter = file.createWriteStream({
    metadata: {
      contentType: 'image/' + type,
      metadata: {
        firebaseStorageDownloadTokens: uuid()
      }
    }
  });
  console.log("OK")

  blobWriter.on('error', (err) =>  res.status(400).json(err));

  blobWriter.on('finish', () => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURI(file.name)}?alt=media`;
      users.findOne({email: email}, function (err, results) {
        if (err) {
            res.status(400).send(err);
        }
        if (results) {
            results.img = publicUrl
            results.markModified("image")
            results.save();
            res.status(200).json({
                results: results,
                savedURL: publicUrl
            })
        }
      })
  });
  blobWriter.end(image.buffer);
}

exports.uploadImage = uploadImage;