const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const db = require('../models');
const { LinkedAccount } = db;

require('dotenv').config(); // Load environment variables from .env

// OAuth 2.0 Configuration using environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate Authorization URL
exports.generateAuthUrl = (userId) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
    state: userId,
  });
};

// Handle OAuth callback and save tokens
exports.handleOAuthCallback = async (userId, code) => {
  try {
    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save refresh token to file (optional)
    // const refreshTokenPath = path.join(__dirname, '../tokens/refresh_token.json');
    // if (tokens.refresh_token) {
    //   fs.writeFileSync(refreshTokenPath, tokens.refresh_token, 'utf8');
    //   console.log('Refresh Token saved to:', refreshTokenPath);
    // }

    // Save linked account in the database
    const linkedAccount = await LinkedAccount.create({
      user_id: userId,
      platform: 'YouTube',
      platform_user_id: 'youtube_user_123', // Replace with actual data if needed
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || null,
      linked_at: new Date(),
    });

    return linkedAccount;
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    throw new Error('Failed to handle OAuth callback.');
  }
};
