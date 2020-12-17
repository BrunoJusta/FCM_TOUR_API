const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const projectId = 'theta-dialect-296815'
const keyFilename = 'theta-dialect-296815-abe7d06abd20.json'
const client = new textToSpeech.TextToSpeechClient({
    projectId,
    keyFilename
});


async function Text2Speech(txt, name) {

    const YourSetting = fs.readFileSync('setting.json');

    let json = {
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
        "outputFileName": name+".mp3"
    };
    
    let data = JSON.stringify(json);
    fs.writeFileSync('setting.json', data);

    const [response] = await client.synthesizeSpeech(JSON.parse(YourSetting));
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(JSON.parse(YourSetting).outputFileName, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${JSON.parse(YourSetting).outputFileName}`);
} 


exports.Text2Speech = Text2Speech;