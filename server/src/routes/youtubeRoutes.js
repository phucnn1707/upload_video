const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { uploadVideo } = require('../controllers/youtubeController');

const router = express.Router();

router.post('/upload/:id', authMiddleware, uploadVideo);

module.exports = router;
