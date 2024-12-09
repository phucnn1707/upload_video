const express = require('express');
const { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } = require('../controllers/videoController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Video CRUD Routes
router.post('/', authMiddleware, createVideo);
router.get('/', authMiddleware, getVideos);
router.get('/:id', authMiddleware, getVideoById);
router.put('/:id', authMiddleware, updateVideo);
router.delete('/:id', authMiddleware, deleteVideo);

module.exports = router;
