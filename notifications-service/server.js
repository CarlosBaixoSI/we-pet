// server.js

const express = require("express");
const http = require("http");

const WebSocket = require("ws");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const cors = require("cors");

dotenv.config();
const { validateToken } = require("./services/tokenValidation");
const app = express();
app.use(cors());
app.use(express.json());
// create application/json parser
var jsonParser = bodyParser.json();

//Store currentlyconnected WebSocket clients
const clients = new Set();

const notificationQueue = [];
const router = express.Router();

router.post("/send-notification", jsonParser, (req, res) => {
  const notification = req.body;
  notificationQueue.push(notification);

  //Limit the size of the queue to 100
  if (notificationQueue.length > 100) {
    notificationQueue.shift(); //remove the oldest notification
  }

  try {
    //Send the notification to all connected clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(notification));
        notificationQueue.shift();
      }
    });

    res.status(201).json({ status: "Notification Sent Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/notifications", router);
//Create a Http server
const server = http.createServer(app);

//Create a WebSocket server and attach it to the Http server
const wss = new WebSocket.Server({ server });

//Handle WebSocket connections
wss.on("connection", async (ws, req) => {
  // Extract token from query parameters
  const token = new URLSearchParams(req.url.substring(1)).get("token");
  console.log("token", token);
  const user = await validateToken(token);
  console.log("user", user);
  if (!user) {
    ws.close(1008, "Invalid token");
    return;
  }
  clients.add(ws);
  //Send the notification queue to the newly connected client
  notificationQueue.forEach((notification) => {
    ws.send(JSON.stringify(notification));
  });

  // Handle incoming messages from the client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  // Handle WebSocket close event
  ws.on("close", (code, reason) => {
    console.log("WebSocket connection closed", code, reason);
    // Remove the client from the set of clients
    clients.delete(ws);
  });
});

const PORT = process.env.PORT || 3008;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
