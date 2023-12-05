const express = require("express");
const app = express();

// Import Swagger
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("../swagger");

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB using the mongoose service
require("./services/mongoose/mongooseService");

// Parse JSON bodies
app.use(express.json());

// Import user routes
const userRouter = require("./routes/userRoutes");

// Start listening on the specified port (USER_MGMT_PORT from .env file or 3004)
const port = process.env.USER_MGMT_PORT || 3002;

// Use the user routes for requests starting with /user
app.use("/users", userRouter);

// Add route  for Swagger documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
// port should be 3002
app.listen(port, () => {
  console.log("Server is running on port %s", port);
});

// Export the app module
module.exports = app;
