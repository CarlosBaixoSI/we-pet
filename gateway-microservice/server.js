const express = require('express')

const {ROUTES} = require("./routes/routes");

const {setupLogging} = require("./logging/logging");
const {setupProxies} = require("./proxy/proxy");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;

setupLogging(app);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})