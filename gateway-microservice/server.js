const express = require('express')

const {ROUTES} = require("./routes/routes");

const {setupLogging} = require("./logging/logging");
const {setupProxies} = require("./proxy/proxy");
const {setupRateLimit} = require("./rateLimit/ratelimit");
//const {setupAuth} = require("./auth/auth");

const app = express();
const port = 3002;

setupLogging(app);
//setupAuth(app, ROUTES);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})