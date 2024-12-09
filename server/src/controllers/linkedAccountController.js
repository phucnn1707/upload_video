const linkedAccountService = require('../services/linkedAccountService');

// Generate Google Authorization URL
const getAuthUrl = (req, res) => {
  try {
    const userId = req.user?.id;
    const authUrl = linkedAccountService.generateAuthUrl(userId);
    res.json({ url: authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error.message);
    res.status(500).json({ error: 'Failed to generate authorization URL.' });
  }
};

// Handle OAuth callback and save tokens
const handleOAuthCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: 'Authorization code and state are required.' });
  }

  try {
    const linkedAccount = await linkedAccountService.handleOAuthCallback(state, code);
    res.json({
      message: 'YouTube account successfully linked!',
      linkedAccount,
    });
  } catch (error) {
    console.error('Error handling OAuth callback:', error.message);
    res.status(500).json({ error: 'Failed to link YouTube account.' });
  }
};

module.exports = { getAuthUrl, handleOAuthCallback };
