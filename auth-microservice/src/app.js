//create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const swaggerUi = require('swagger-ui-express');
//const swaggerSpec = require('../../swagger');

//use .env file
require('dotenv').config();

//start listening on port AUTH_PORT (defined in .env file)
const port = process.env.AUTH_PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//initialize services
//initialize i18n service
const i18n = require("./services/i18n/translationService");
//initialize mongoose service
require("./services/mongoose/mongooseService");

const authRoutes = require('./routes/authRoutes');
const passwordManagementRoutes = require('./routes/passwordManagementRoutes');
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/password',passwordManagementRoutes);
app.listen(port, () => console.log(i18n.__("Listening on port %s", port)));

module.exports = app;