const express = require('express')

const {ROUTES} = require("./routes/routes");

const {setupLogging} = require("./logging/logging");
const {setupProxies} = require("./proxy/proxy");

const app = express();
const port = 3002;

setupLogging(app);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})