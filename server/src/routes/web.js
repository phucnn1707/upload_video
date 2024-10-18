const express = require('express');
const { handleCreateUser, handleHelloWorld, handleUserPage } = require('../controllers/homeController');

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
  router.get('/users', handleUserPage);
  router.post('/users/create-user', handleCreateUser);
  router.get('/', (req, res) => {
    return res.send('Hello, world!');
  });

  return app.use('/', router);
};

module.exports = initWebRoutes;
