const express = require('express');
const router = express.Router();
const codeBlockController = require('../controllers/codeBlockController');

// Route to fetch all code blocks
router.get('/', codeBlockController.getAllCodeBlocks);

// Route to fetch a specific code block by ID
router.get('/:id', codeBlockController.getCodeBlockById);

module.exports = router;