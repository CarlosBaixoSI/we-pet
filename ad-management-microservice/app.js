const express = require("express");
const app = express();

//middleware
app.use(express.json());

const advertisementRouter = require("./routes/advertisementRoutes");

require('dotenv').config();
require("./services/mongoose/mongooseService");

//start listening on port AUTH_PORT (defined in .env file)
const port = process.env.AD_MGMT_PORT || 3004;

app.use("/advertisements", advertisementRouter);

app.listen(port, () => {
  console.log("Server is running on port %s", port);
});

module.exports = app;