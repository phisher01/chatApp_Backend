require('dotenv').config();
const express = require('express');
const http    = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const { sendChatHistory, handleMessage } = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//  Connect to MongoDB 
 mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  ws.on('message', async (data) => {
    const msg = JSON.parse(data);
    switch (msg.type) {
      case 'join':
        // Set username and then send recent history
        ws.username = msg.payload;
        await sendChatHistory(ws);
        break;
      case 'message':
        await handleMessage(wss, ws, msg.payload);
        break;
      default:
        console.warn('Unknown message type:', msg.type);
    }
  });

  ws.on('close', () => console.log(`${ws.username || 'User'} disconnected`));
});


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));