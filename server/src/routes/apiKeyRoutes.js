const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { createApiKey, getAllApiKeys, getApiKeyByServiceName } = require('../controllers/apiKeyController');

const router = express.Router();

// API Key Routes
router.post('/', authMiddleware, createApiKey); // Create a new API key
router.get('/', authMiddleware, getAllApiKeys); // Get all API keys
router.get('/:serviceName', getApiKeyByServiceName); // Get API key by service name

module.exports = router;
