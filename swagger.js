const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WePet API',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
