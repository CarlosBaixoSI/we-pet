const express = require("express");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const shelterRouter = require("./routes/ShelterRoutes");
require('dotenv').config();

const port = process.env.AUTH_PORT || 3006;
const i18n = require("./services/i18n/translationService");
require("./services/mongoose/mongooseService");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/shelters", shelterRouter);

app.listen(port, () => console.log(i18n.__("Listening on port %s", port)));


module.exports = app;
