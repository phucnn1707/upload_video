const express = require('express');
const { generateText, generateVideo, getGeneratedVideo } = require('../controllers/generateController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Generate AI content routes
router.post('/text', authMiddleware, generateText); // Generate text based on keywords
router.post('/video', authMiddleware, generateVideo); // Generate a video
router.get('/video/:id', authMiddleware, getGeneratedVideo); // Get generated video by ID

module.exports = router;
