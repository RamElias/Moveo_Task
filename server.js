const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/coding_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// Define the CodeBlock schema
const codeBlockSchema = new mongoose.Schema({
    name: String,
    code: String,
    solution: String,
});

// Create the CodeBlock model
const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);

// Serve static files from the "frontend/build" directory
app.use(express.static('frontend/build'));

// Serve the lobby page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
});

// API endpoint to fetch code blocks
app.get('/api/codeblocks', async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find({}, { solution: 0 });
        res.json(codeBlocks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to fetch a specific code block by ID
app.get('/api/codeblocks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const codeBlock = await CodeBlock.findById(id);
        if (codeBlock) {
            res.json(codeBlock);
        } else {
            res.status(404).json({ error: 'Code block not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Socket.io event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for code updates from the student
    socket.on('codeUpdate', async ({ id, code }) => {
        try {
            const codeBlock = await CodeBlock.findById(id);
            if (codeBlock) {
                codeBlock.code = code;
                await codeBlock.save();

                // Broadcast the code update to all connected clients (including the mentor)
                io.emit('codeUpdate', { id, code });
            }
        } catch (error) {
            console.error('Failed to update code:', error);
        }
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
