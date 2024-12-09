const express = require('express');
const { getGoogleTrends, getYouTubeTrends } = require('../controllers/searchApiController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Trend Routes
router.get('/google', authMiddleware, getGoogleTrends);
router.get('/youtube', authMiddleware, getYouTubeTrends);

module.exports = router;
