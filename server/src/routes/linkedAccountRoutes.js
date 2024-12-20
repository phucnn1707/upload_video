const express = require('express');
const {
  getAuthUrl,
  handleOAuthCallback,
  revokeRefreshToken,
  getActiveLinkedAccounts,
} = require('../controllers/linkedAccountController'); // Updated import
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Route to generate OAuth Authorization URL
router.get('/:platform/get-auth-url', authMiddleware, getAuthUrl);

// Route to handle OAuth callback for a specific platform
router.get('/:platform/oauth-callback', handleOAuthCallback);

// Route to revoke refresh token for a specific platform
router.post('/:platform/revoke-token', authMiddleware, revokeRefreshToken);

// Route to get active linked accounts
router.get('/', authMiddleware, getActiveLinkedAccounts);

module.exports = router;
