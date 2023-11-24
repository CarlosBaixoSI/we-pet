//create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//use .env file
require('dotenv').config();

//start listening on port AUTH_PORT (defined in .env file)
const port = process.env.USER_MGMT_PORT || 3002;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//initialize mongoose service
require("./services/mongoose/mongooseService");

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
app.listen(port, () => console.log("Listening on port %s", port));

module.exports = app;