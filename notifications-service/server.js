// server.js

const express = require("express");
const http = require("http");

const WebSocket = require("ws");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// create application/json parser
var jsonParser = bodyParser.json();

//Store currentlyconnected WebSocket clients
const clients = new Set();

const notificationQueue = [];

app.post("/send-notification", jsonParser, (req, res) => {
  const notification = req.body;
  notificationQueue.push(notification);

  //Limit the size of the queue to 100
  if (notificationQueue.length > 100) {
    notificationQueue.shift(); //remove the oldest notification
  }

  //Send the notification to all connected clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN)
      client.send(JSON.stringify(notification));
  });

  res.status(201).json({ status: "Notification Sent Successfully" });
});

//Create a Http server
const server = http.createServer(app);

//Create a WebSocket server and attach it to the Http server
const wss = new WebSocket.Server({ server });

//Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New client connected");
  //Add the new client to the set of clients
  clients.add(ws);

  //Send the notification queue to the newly connected client
  notificationQueue.forEach((notification) => {
    ws.send(JSON.stringify(notification));
  });

  // Send a welcome message to the client
  ws.send("Welcome to the WebSocket server!");

  // Handle incoming messages from the client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  // Handle WebSocket close event
  ws.on("close", () => {
    console.log("WebSocket connection closed");
    // Remove the client from the set of clients
    clients.delete(ws);
  });
});

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  "https://127.0.0.1:8080/dashboard",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

app.post("/subscribe", jsonParser, (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ status: "success" });
});

// app.post("/send-notification", jsonParser, (req, res) => {
//   const notificationPayload = {
//     title: "New Notification",
//     body: "This is a new notification",
//     data: {
//       url: "https://example.com",
//     },
//   };

//   Promise.all(
//     subscriptions.map((subscription) =>
//       webpush.sendNotification(
//         subscription,
//         JSON.stringify(notificationPayload)
//       )
//     )
//   )
//     .then(() => {
//       console.log(subscriptions),
//         res.status(200).json({ message: "Notification sent successfully." });
//     })
//     .catch((err) => {
//       console.error("Error sending notification:" + err);
//       res.sendStatus(500);
//     });
// });

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
