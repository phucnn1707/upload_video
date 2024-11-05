const express = require('express');
const { testApi } = require('../controllers/apiController');
const { handleLogin } = require('../controllers/loginController');

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

  return app.use('/api/v1/', router);
};

module.exports = initApiRoutes;
