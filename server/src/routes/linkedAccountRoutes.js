const express = require('express');
const { getAuthUrl, handleOAuthCallback } = require('../controllers/linkedAccountController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Routes for linked accounts
router.get('/:platform/get-auth-url', authMiddleware, getAuthUrl);
router.get('/:platform/oauth-callback', handleOAuthCallback);

module.exports = router;
