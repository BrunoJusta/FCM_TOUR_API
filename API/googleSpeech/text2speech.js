const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const projectId = 'theta-dialect-296815'
const keyFilename = './API/googleSpeech/theta.json'
const client = new textToSpeech.TextToSpeechClient({
    projectId,
    keyFilename
});


function speeching(txt, name){
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
        "outputFileName": name + ".mp3"
    };
    
    let data = JSON.stringify(json);
    fs.writeFileSync('setting.json', data);
    
    const YourSetting = fs.readFileSync('setting.json');
    async function Text2Speech(YourSetting) {
        const [response] = await client.synthesizeSpeech(JSON.parse(YourSetting));
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(JSON.parse(YourSetting).outputFileName, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${JSON.parse(YourSetting).outputFileName}`);
    } 
    Text2Speech(YourSetting);
}

exports.speeching = speeching;
