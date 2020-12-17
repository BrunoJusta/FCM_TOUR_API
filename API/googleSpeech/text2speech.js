const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const projectId = 'theta-dialect-296815'
const keyFilename = 'theta-dialect-296815-abe7d06abd20.json'
const client = new textToSpeech.TextToSpeechClient({
    projectId,
    keyFilename
});


const audioTxt = 'Nascido no seio da Fundação Cupertino de Miranda, Vila Nova de Famalicão, em 2009, o grupo vocal Cupertinos dedica-se quase em exclusivo à música portuguesa dos séculos XVI e XVII, alicerçada num núcleo de compositores de renome mundial como Duarte Lobo, Manuel Cardoso, Filipe de Magalhães ou Pedro de Cristo. Com uma média anual superior a quinze concertos, os Cupertinos apresentaram já cerca de duas centenas e meia de obras, incluindo mais de cem inéditos. Numa abordagem performativa sem precedentes, vários destes inéditos têm sido transcritos a partir das fontes originais pelos próprios elementos do grupo sob a supervisão do seu diretor musical, Luís Toscano, e do Prof. Doutor José Abreu (Universidade de Coimbra e ESMAE).Além do Festival Internacional de Polifonia Portuguesa, do qual são anfitriões, os Cupertinos têm participado em conceituados festivais de música, nomeadamente II e VI Ciclo de Requiem de Coimbra, IX Ciclo de Música Sacra da Igreja Românica de São Pedro de Rates, XXII e XXV Cistermúsica – Festival de Música de Alcobaça, Ciclo “Espaços da Polifonia”, XVIII Jornadas Polifónicas Internacionales “Ciudad de Ávila”, West Coast Early Music Festival e Bolzano Festival Bozen. Após a estreia no Reino Unido, em Fevereiro de 2020, na série de concertos “Choral at Cadogan”, futuros compromissos incluem a apresentação no Wigmore Hall em Janeiro de 2021, na Alemanha em Maio de 2021 – Festival “Tage Alter Musik” em Regensburg – e na Estónia em Julho de 2021 – “Haapsalu Early Music Festival”. Crescentemente reputados como verdadeiros embaixadores da Polifonia Portuguesa, os Cupertinos viram este epíteto reforçado com o recente lançamento do seu primeiro trabalho discográfico, dedicado a Manuel Cardoso. Editado pela prestigiada etiqueta Hyperion, este CD é presença assídua nas rádios clássicas por toda a Europa e tem sido aclamado na imprensa da especialidade (BBC Music Magazine, Gramophone, Choir & Organ, Chorzeit). Conquistou o primeiro galardão com a inclusão na “Bestenliste” da “deutscher Schallplattenkritik” e foi distinguido nos Gramophone Classical Music Awards 2019, vencendo na categoria de “Música Antiga”.'

let json = {
    "audioConfig": {
        "audioEncoding": "LINEAR16",
        "pitch": 0,
        "speakingRate": 1.00
    },
    "input": {
        "text": audioTxt
    },
    "voice": {
        "languageCode": "pt-PT",
        "name": "pt-PT-Wavenet-A"
    },
    "outputFileName": "osCupertinos.mp3"
};

let data = JSON.stringify(json);
fs.writeFileSync('setting.json', data);

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