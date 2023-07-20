const express = require('express');
const http = require('http');
const cors = require('cors');
const codeBlockRoutes = require('./routes/codeBlockRoutes');
const WebSocket = require('ws');
const { getCodeBlocksArray } = require('./controllers/codeBlockController');
const codeBlocks = getCodeBlocksArray();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

// Define routes for API endpoints
app.use('/api/codeblocks', codeBlockRoutes);

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
