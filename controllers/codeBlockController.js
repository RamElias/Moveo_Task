const mysql = require('mysql2');

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

let codeBlocks = [];

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

fetchCodeBlocks();

// Function to fetch all code blocks from the database
const getAllCodeBlocks = (req, res) => {
    const query = 'SELECT id, title FROM code_blocks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching code blocks:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
};

// Function to fetch a specific code block by ID from the database
const getCodeBlockById = (req, res) => {
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
};

const getCodeBlocksArray = () => {
    return codeBlocks;
};

module.exports = {
    getAllCodeBlocks,
    getCodeBlockById,
    getCodeBlocksArray
};