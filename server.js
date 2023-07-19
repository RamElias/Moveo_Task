const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mysql.createConnection({
    host: 'containers-us-west-110.railway.app',
    user: 'root',
    password: 'I0tDtu14ZUaDrwzHebAs',
    port: '7696',
    database: 'railway',
    protocol: 'tcp'
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// API endpoint to fetch code blocks from the database
app.get('/api/codeblocks', (req, res) => {
    const query = 'SELECT id, title FROM code_blocks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching code blocks:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

// API endpoint to fetch a specific code block by ID from the database
app.get('/api/codeblocks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, title, code, solution FROM code_blocks WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching code block:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Code block not found' });
        } else {
            const codeBlock = results[0];
            res.json(codeBlock);
        }
    });
});

// Define code blocks
let codeBlocks = [];

// Fetch code blocks from the database and store them in the codeBlocks array
const fetchCodeBlocks = () => {
    const query = 'SELECT id, title, code, solution FROM code_blocks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching code blocks:', err);
        } else {
            codeBlocks = results;
        }
    });
};

// Call fetchCodeBlocks function when the server starts
fetchCodeBlocks();

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
