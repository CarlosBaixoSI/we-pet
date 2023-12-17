const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Define the options for Swagger JSdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wepet Microservices API Documentation',
      version: '1.0.0',
    },
  },
  apis: [
    'advertisement-microservice/routes/*.js',
    'donations-microservice/routes/*.js',
    'animal-microservice/routes/*.js',
    'user-microservice/routes/*.js',
    'auth-microservice/src/routes/*.js',
    'shelter-microservice/routes/*.js',
  ],
};

// Generate the combined Swagger specification object
const combinedSwaggerSpec = swaggerJsdoc(options);

// Serve the combined Swagger documentation using Swagger UI Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerSpec));

// Start the server
const port = 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
