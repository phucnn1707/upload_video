const express = require('express');
const {
  handleCreateUser,
  handleGetAllUsers,
  handleUpdateUser,
  handleDeleteUser,
} = require('../controllers/userController');

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */
const initWebRoutes = (app) => {
  router.post('/users/create-user', handleCreateUser);

  router.get('/users', handleGetAllUsers);

  router.put('/users/:id', handleUpdateUser);

  router.delete('/users/:id', handleDeleteUser);

  router.get('/', (req, res) => {
    return res.send('Hello, world!');
  });

  return app.use('/', router);
};

module.exports = initWebRoutes;
