const express = require('express');
const { createKeyword, getAllKeywords } = require('../controllers/keywordController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Keyword Routes
router.post('/', authMiddleware, createKeyword); // Create a new keyword
router.get('/', authMiddleware, getAllKeywords); // Get all keywords

module.exports = router;
