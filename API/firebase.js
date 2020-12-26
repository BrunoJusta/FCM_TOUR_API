const uuid = require('uuid-v4');
const keyFilename = './API/fcmtour-347cf-firebase-adminsdk-qmqn9-d61fffd41e.json'
const {Storage} = require('@google-cloud/storage');


async function uploadImage(image, name){

        const storage = new Storage({
            projectId: 'fcmtour-347cf',
            keyFilename: keyFilename
        }); 
        
        let bucketName = "fcmtour-347cf.appspot.com"
        const bucket = storage.bucket(bucketName);
        var file = bucket.file('images/' + name + ".png");

        let link = "https://firebasestorage.googleapis.com/v0/b/" + bucketName + "/o/" + 'images%2F' + name + ".mp3" + "?alt=media"

        const options = { 
            metadata: {
              contentType: 'image/png',
              cacheControl: 'public, max-age=31536000',
              metadata:{
                firebaseStorageDownloadTokens: uuid()
              }
            }
        };

        return await file.save(image, options)
        .then(response => {
          console.log(response)
          return link; 
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    
}

exports.uploadImage = uploadImage;
