
const express = require('express');
const app = express();
const port = 3002;
const WebSocket = require('ws');
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Document = sequelize.define('Document', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lastModified: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  history: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

sequelize.sync();

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

        doc.history.push({
            content: doc.content,
            version: doc.version,
            modifiedAt: doc.lastModified
        });
        await doc.save();
        console.log('Document history:', doc.history);
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

app.use(express.json());

app.post('/chat', (req, res) => {
  const { message } = req.body;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'chat', message }));
    }
  });
  res.status(200).send({ status: 'Message sent' });
});

app.post('/documents', async (req, res) => {
  const { content, version } = req.body;
  const newDocument = new Document({ content, version, lastModified: new Date(), history: [{ content, version, modifiedAt: new Date() }] });
  await newDocument.save();
  res.status(201).send(newDocument);
});

app.put('/documents/:id', async (req, res) => {
  const { content, version } = req.body;
const document = await Document.findByPk(req.params.id);
  if (document.version === version) {
    document.content = content;
    document.version += 1;
    document.lastModified = new Date();
    const history = document.history || [];
    history.push({ content: document.content, version: document.version, modifiedAt: document.lastModified });
    document.history = history;
    await document.save();
    res.send(document);
  } else {
    res.status(409).send({ error: 'Version conflict' });
  }
});

app.get('/documents/:id/history', async (req, res) => {
  const document = await Document.findByPk(req.params.id);
  res.send(document.history);
});

app.put('/documents/:id/revert', async (req, res) => {
  const { version } = req.body;
  const document = await Document.findByPk(req.params.id);
  const historyItem = document.history.find(item => item.version === version);
  if (historyItem) {
    document.content = historyItem.content;
    document.version = version;
    document.lastModified = new Date();
    await document.save();
    res.send(document);
  } else {
    res.status(404).send({ error: 'Version not found' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
