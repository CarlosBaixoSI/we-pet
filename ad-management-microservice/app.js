const express = require("express");
const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB using the mongoose service
require("./services/mongoose/mongooseService");

// Parse JSON bodies
app.use(express.json());

// Import advertisement routes
const advertisementRouter = require("./routes/advertisementRoutes");

// Start listening on the specified port (AD_MGMT_PORT from .env file or 3004)
const port = process.env.AD_MGMT_PORT || 3004;

// Use the advertisement routes for requests starting with /advertisements
app.use("/advertisements", advertisementRouter);

// Start the server
// port should be 3004
app.listen(port, () => {
  console.log("Server is running on port %s", port);
});

// Export the app module
module.exports = app;
