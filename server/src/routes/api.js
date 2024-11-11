const express = require('express');
const { testApi } = require('../controllers/apiController');
const { handleLogin } = require('../controllers/loginController');
const { getGoogleTrends, getYouTubeTrends } = require('../controllers/searchApiController');
const { createKeyword, getAllKeywords } = require('../controllers/keywordController');

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initApiRoutes = (app) => {
  //rest api
  //GET, POST, PUT, DELETE
  router.get('/test-api', testApi);

  router.post('/login', handleLogin);

  // Route to get Google trending keywords
  router.get('/trending/google', getGoogleTrends);

  // Route to get YouTube trending keywords
  router.get('/trending/youtube', getYouTubeTrends);

  // Route to create a keyword
  router.post('/keyword', createKeyword);

  // Route to get all keywords
  router.get('/keyword', getAllKeywords);

  return app.use('/api/v1/', router);
};

module.exports = initApiRoutes;
