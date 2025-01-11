const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Dummy data generator
  const sendMetrics = () => {
    const data = {
      cpu: (Math.random() * 100).toFixed(2),     // Random CPU usage %
      memory: (Math.random() * 16).toFixed(2),   // Random memory usage in GB
      network: (Math.random() * 1000).toFixed(2), // Random network traffic in Mbps
      diskIO: (Math.random() * 500).toFixed(2),  // Random disk I/O in MBps
    };
    ws.send(JSON.stringify(data));
  };

  // Send data every second
  const interval = setInterval(sendMetrics, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
