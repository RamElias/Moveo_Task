const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "client/build" directory
app.use(express.static('client/build'));

// Serve the lobby page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

// Define code blocks
const codeBlocks = [
    { id: 1, title: 'Async case', code: 'console.log("Async case code");' },
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
    console.log("i am in server");
    const { id } = req.params;
    const codeBlock = codeBlocks.find((block) => block.id === parseInt(id));
    if (codeBlock) {
        res.json(codeBlock);
    } else {
        res.status(404).json({ error: 'Code block not found' });
    }
});


// Socket.io event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for code updates from the student
    socket.on('codeUpdate', ({ id, code }) => {
        // Handle code updates as desired
    });

    // Disconnect event handling
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 3001; // Choose a port number of your choice
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
