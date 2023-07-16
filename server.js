const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Code blocks data
const codeBlocks = [
    { id: 1, title: 'Code Block 1', code: 'console.log("Code block 1");' },
    { id: 2, title: 'Code Block 2', code: 'console.log("Code block 2");' },
    { id: 3, title: 'Code Block 3', code: 'console.log("Code block 3");' },
    { id: 4, title: 'Code Block 4', code: 'console.log("Code block 4");' },
];

app.use(express.static('frontend/build'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Mentor joining the code block
    socket.on('mentorJoin', (id) => {
        const codeBlock = codeBlocks.find((block) => block.id === id);
        if (codeBlock) {
            socket.emit('codeUpdate', codeBlock.code);
        }
    });

    // Student joining the code block
    socket.on('studentJoined', (id) => {
        const codeBlock = codeBlocks.find((block) => block.id === id);
        if (codeBlock) {
            socket.join(`codeBlock-${id}`);
        }
    });

    // Code updates from mentor
    socket.on('codeUpdate', ({ id, code }) => {
        const codeBlock = codeBlocks.find((block) => block.id === id);
        if (codeBlock) {
            codeBlock.code = code;
            io.to(`codeBlock-${id}`).emit('codeUpdate', code);
        }
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


const port = 3001; // Choose a port number of your choice
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/codeblocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const codeBlock = codeBlocks.find((block) => block.id === id);
    if (codeBlock) {
        res.json({ code: codeBlock.code });
    } else {
        res.status(404).json({ error: 'Code block not found' });
    }
});
