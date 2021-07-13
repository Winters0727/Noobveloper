const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Noobveloper API',
            version: '1.0.0',
            description: 'Noobveloper API Swagger',
        },
        host: 'localhost:8000',
        basePath: '/'
    },
    apis: ['../routes/*.js', './swagger/*']
};

const specs = swaggereJsdoc(options);
    
module.exports = {
    swaggerUi,
    specs
};