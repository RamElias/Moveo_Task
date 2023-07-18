const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Define code blocks
const codeBlocks = [
    { id: 1, title: 'Async case', code: 'console.log("Async case code"); function foo() return null;' },
    { id: 2, title: 'Event handling', code: 'console.log("Event handling code");' },
    { id: 3, title: 'Data manipulation', code: 'console.log("Data manipulation code");' },
    { id: 4, title: 'Promises', code: 'console.log("Promises code");' },
];

// API endpoint to fetch code blocks
app.get('/api/codeblocks', (req, res) => {
    const codeBlockList = codeBlocks.map(({ id, title }) => ({ id, title }));
    res.json(codeBlockList);
});

// API endpoint to fetch a specific code block by ID
app.get('/api/codeblocks/:id', (req, res) => {
    const { id } = req.params;
    const codeBlock = codeBlocks.find((block) => block.id === parseInt(id));
    if (codeBlock) {
        res.json(codeBlock);
    } else {
        res.status(404).json({ error: 'Code block not found' });
    }
});

// WebSocket event handling
wss.on('connection', (ws) => {
    console.log('A user connected');

    // Listen for code updates from clients
    ws.on('message', (data) => {
        const { id, code } = JSON.parse(data);
        const codeBlock = codeBlocks.find((block) => block.id === parseInt(id));
        if (codeBlock) {
            codeBlock.code = code;
            // Broadcast the code update to all connected clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ id, code }));
                }
            });
        }
    });

    // Disconnect event handling
    ws.on('close', () => {
        console.log('A user disconnected');
    });
});

const port = 5000; // Choose a port number of your choice
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
