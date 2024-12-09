const express = require('express');
const { testApi } = require('../controllers/apiController');
const { handleLogin } = require('../controllers/loginController');

const router = express.Router();

// Public routes for authentication
router.get('/test-api', testApi); // Test API
router.post('/login', handleLogin); // Login route

module.exports = router;
