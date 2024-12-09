const express = require('express');
const { createAvatar, getAllAvatars } = require('../controllers/avatarAiController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// AvatarAI Routes
router.post('/', authMiddleware, createAvatar); // Create a new avatar
router.get('/', authMiddleware, getAllAvatars); // Get all avatars

module.exports = router;
