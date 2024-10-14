
const express = require('express');
const app = express();
const port = 3002;
const WebSocket = require('ws');
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/realtime-text-editor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const documentSchema = new mongoose.Schema({
  content: String,
  version: Number,
  lastModified: Date,
  history: [
    {
      content: String,
      version: Number,
      modifiedAt: Date,
    },
  ],
});



const Document = mongoose.model('Document', documentSchema);

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', async (message) => {
    const { type, data } = JSON.parse(message);
    if (type === 'document') {
      const { content, version } = data;
      const doc = await Document.findOne();
      if (doc.version === version) {
        doc.content = content;
        doc.version += 1;
        doc.lastModified = new Date();
        await doc.save();
        ws.send(JSON.stringify({ type: 'document', data: doc }));
      } else {
        ws.send(JSON.stringify({ type: 'conflict', data: doc }));
      }
    }
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const Document = mongoose.model('Document', documentSchema);

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
