
const Message = require('../models/Message');
const WebSocket = require('ws');  // Import WebSocket for readyState constants

// Send last 50 messages to a client
async function sendChatHistory(ws) {
  const history = await Message.find().sort({ timestamp: -1 }).limit(50);
  ws.send(JSON.stringify({ type: 'history', payload: history.reverse() }));
}

// Save and broadcast a new message
async function handleMessage(wss, ws, text) {
  const username = ws.username || 'Anonymous';
  const saved = await Message.create({ username, text });
  const broadcast = JSON.stringify({ type: 'message', payload: saved });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(broadcast);
    }
  });
}

module.exports = { sendChatHistory, handleMessage };