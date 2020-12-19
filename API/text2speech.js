const textToSpeech = require('@google-cloud/text-to-speech');
const projectId = 'theta-dialect-296815'
const uuid = require('uuid-v4');
const keyFilename = './API/theta.json'
const keyFilename2 = './API/fcmtour-347cf-firebase-adminsdk-qmqn9-d61fffd41e.json'
const {Storage} = require('@google-cloud/storage');
const client = new textToSpeech.TextToSpeechClient({
    projectId,
    keyFilename
});


async function speeching(txt, name){

    let YourSetting = JSON.stringify({
        "audioConfig": {
            "audioEncoding": "LINEAR16",
            "pitch": 0,
            "speakingRate": 1.00
        },
        "input": {
            "text": txt
        },
        "voice": {
            "languageCode": "pt-PT",
            "name": "pt-PT-Wavenet-A"
        },
        "outputFileName": name + ".mp3"
    });
    
    async function Text2Speech(YourSetting) {
        const [response] = await client.synthesizeSpeech(JSON.parse(YourSetting));

        
        const storage = new Storage({
            projectId: 'fcmtour-347cf',
            keyFilename: keyFilename2
        }); 
        
        let bucketName = "fcmtour-347cf.appspot.com"
        const bucket = storage.bucket(bucketName);
        var file = bucket.file('Audio/' + name + ".mp3");

        let link = "https://firebasestorage.googleapis.com/v0/b/" + bucketName + "/o/" + 'Audio%2F' + name + ".mp3" + "?alt=media DUMMY"
        const options = { 
            metadata: {
              contentType: 'audio/mpeg',
              metadata: {
                source: 'Google Text-to-Speech'
              },
              metadata:{
                firebaseStorageDownloadTokens: uuid()
              }
            }
        };

        return await file.save(response.audioContent, options)
        .then(response2 => {
          console.log(response2)
          return link; 
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    } 

    return await Text2Speech(YourSetting);
    
}

exports.speeching = speeching;
