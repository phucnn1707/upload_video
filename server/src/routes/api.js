const express = require('express');
const { testApi } = require('../controllers/apiController');
const { handleLogin } = require('../controllers/loginController');
const { getGoogleTrends, getYouTubeTrends } = require('../controllers/searchApiController');
const { createKeyword, getAllKeywords } = require('../controllers/keywordController');
const { generateText, generateVideo, getGeneratedVideo } = require('../controllers/generateController');
const {
  createTextScript,
  getTextScripts,
  getTextScriptById,
  updateTextScript,
  deleteTextScript,
} = require('../controllers/textScriptController');
const authMiddleware = require('../middlewares/auth.middleware');
const { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } = require('../controllers/videoController');

const router = express.Router();

/**
 * Initializes all API routes with authentication where required.
 *
 * @param {object} app - The Express app instance
 */
const initApiRoutes = (app) => {
  // Public Routes
  router.get('/test-api', testApi); // Test API
  router.post('/login', handleLogin); // Login route

  // Protected Routes (grouped with authMiddleware)
  router.use(authMiddleware); // Apply authMiddleware to all routes below

  // Trend Routes
  router.get('/trending/google', getGoogleTrends); // Get Google trends
  router.get('/trending/youtube', getYouTubeTrends); // Get YouTube trends

  // Keyword Routes
  router.post('/keyword', createKeyword); // Create a new keyword
  router.get('/keyword', getAllKeywords); // Get all keywords

  // Text Generation Route
  router.post('/generate-text', generateText); // Generate text based on keyword

  // TextScript CRUD Routes
  router.post('/textscripts', createTextScript); // Create a TextScript
  router.get('/textscripts', getTextScripts); // Get all TextScripts
  router.get('/textscripts/:id', getTextScriptById); // Get a specific TextScript by ID
  router.put('/textscripts/:id', updateTextScript); // Update a specific TextScript by ID
  router.delete('/textscripts/:id', deleteTextScript); // Delete a specific TextScript by ID

  // CRUD Routes for Video
  router.post('/videos', createVideo); // Create a video
  router.get('/videos', getVideos); // Get all videos
  router.get('/videos/:id', getVideoById); // Get a video by ID
  router.put('/videos/:id', updateVideo); // Update a video by ID
  router.delete('/videos/:id', deleteVideo); // Delete a video by ID

  // Generate AI Video from TextScript
  router.post('/generate-video', generateVideo);
  router.get('/generate-video/:id', getGeneratedVideo);

  // Apply all routes under the `/api/v1` prefix
  app.use('/api/v1', router);

  return app;
};

module.exports = initApiRoutes;
