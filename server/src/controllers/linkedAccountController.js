const linkedAccountService = require('../services/linkedAccountService');
require('dotenv').config(); // Load environment variables from .env

const CLIENT_HOME_URL = process.env.CLIENT_HOME_URL;

// Generate Authorization URL for a specific platform
const getAuthUrl = (req, res) => {
  try {
    const { platform } = req.params; // Extract platform from URL
    const userId = req.user?.id;

    // Validate user authentication
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated.' });
    }

    // Validate platform existence
    if (!platform) {
      return res.status(400).json({ error: 'Platform is required.' });
    }

    // Generate the authorization URL
    const authUrl = linkedAccountService.generateAuthUrl(userId, platform);

    // Respond with the URL and platform name
    res.json({ url: authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error.message);
    res.status(500).json({ error: 'Failed to generate authorization URL.' });
  }
};

// Handle OAuth callback for a specific platform
const handleOAuthCallback = async (req, res) => {
  const { platform } = req.params; // Extract platform from URL
  const { code, state } = req.query; // Extract query parameters

  // Validate platform existence
  if (!platform) {
    return res.status(400).json({ error: 'Platform is required.' });
  }

  // Validate OAuth query parameters
  if (!code || !state) {
    return res.status(400).json({ error: 'Authorization code and state are required.' });
  }

  try {
    // Process the OAuth callback
    const LinkedAccount = await linkedAccountService.handleOAuthCallback(state, code, platform);

    // Redirect to the client with success status
    return res.redirect(
      `${CLIENT_HOME_URL}/sns?platform=${platform}&status=success&platform_user_id=${LinkedAccount.platform_user_id}`
    );
  } catch (error) {
    console.error(`Error handling ${platform} OAuth callback:`, error.message);

    // Redirect to the client with error status
    return res.redirect(
      `${CLIENT_HOME_URL}/sns?platform=${platform}&status=error&error=${encodeURIComponent(error.message)}`
    );
  }
};

// Revoke refresh token for a specific platform
const revokeRefreshToken = async (req, res) => {
  const { platform } = req.params; // Extract platform from URL
  const userId = req.user?.id;

  // Validate user authentication
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  // Validate platform existence
  if (!platform) {
    return res.status(400).json({ error: 'Platform is required.' });
  }

  try {
    // Revoke the refresh token
    await linkedAccountService.revokeRefreshToken(userId, platform);

    res.json({ message: `Refresh token for ${platform} revoked successfully.` });
  } catch (error) {
    console.error(`Error revoking ${platform} refresh token:`, error.message);
    res.status(500).json({ error: `Failed to revoke ${platform} refresh token.` });
  }
};

const getActiveLinkedAccounts = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const activeAccounts = await linkedAccountService.getActiveLinkedAccounts(userId);

    return res.status(200).json({ success: true, data: activeAccounts });
  } catch (error) {
    console.error('Error fetching active linked accounts:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to fetch active linked accounts.' });
  }
};

module.exports = { getAuthUrl, handleOAuthCallback, revokeRefreshToken, getActiveLinkedAccounts };
