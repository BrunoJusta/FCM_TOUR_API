  
const options = {
    swaggerDefinition: {
        info: {
            description: 'API for Fundação Cupertino de Miranda mobile Aplication',
            title: 'FCM TOUR API',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer Token",
            }
        }
        
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js']
};


//https://fcm-tour.herokuapp.com/
module.exports = options; 