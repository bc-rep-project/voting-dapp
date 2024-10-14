
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { WebSocketServer } = require('ws');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/text-editor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Express routes
app.get('/', (req, res) => {
  res.send('Text Editor API');
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
