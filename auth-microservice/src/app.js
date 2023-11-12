//create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//use .env file
require('dotenv').config();

//start listening on port AUTH_PORT (defined in .env file)
const port = process.env.AUTH_PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));