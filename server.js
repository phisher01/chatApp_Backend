// Load environment variables from .env into process.env
require('dotenv').config();

const express   = require('express');
const http      = require('http');
const WebSocket = require('ws');
const mongoose  = require('mongoose');

// Your Mongoose Message model
const Message   = require('./models/Message');
// Controller functions to handle chat logic
const {
  sendChatHistory,
  handleMessage
} = require('./controllers/chatController');

// ─── Setup Express & HTTP Server ────────────────────────────────────────
const app    = express();                // (You can add REST endpoints here if needed)
const server = http.createServer(app);   // Wrap Express in an HTTP server

// ─── Attach WebSocket Server ─────────────────────────────────────────────
const wss = new WebSocket.Server({ server });

// ─── Connect to MongoDB Atlas ────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)        // MONGO_URI defined in your .env
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ─── Handle new WebSocket connections ────────────────────────────────────
wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  // Listen for messages from this client
  ws.on('message', async (data) => {
    const msg = JSON.parse(data);

    switch (msg.type) {
      case 'join':
        // When a client joins, store their username on the socket
        ws.username = msg.payload;
        // Send last 50 messages to this client
        await sendChatHistory(ws);
        break;

      case 'message':
        // A new chat message: save to DB and broadcast
        await handleMessage(wss, ws, msg.payload);
        break;

      default:
        console.warn('Unknown message type:', msg.type);
    }
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log(`${ws.username || 'User'} disconnected`);
  });
});

// ─── Start HTTP + WebSocket Server ───────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
