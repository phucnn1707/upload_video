const { google } = require('googleapis');
const axios = require('axios');
const db = require('../models');
const { LinkedAccount } = db;

require('dotenv').config(); // Load environment variables from .env

// OAuth 2.0 Configuration using environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate Authorization URL for a specific platform
exports.generateAuthUrl = (userId, platform) => {
  switch (platform) {
    case 'youtube':
      return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
          'https://www.googleapis.com/auth/youtube.upload',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
        state: userId,
      });

    case 'tiktok':
      const tiktokAuthUrl = `https://www.tiktok.com/auth/authorize?client_key=${process.env.TIKTOK_CLIENT_ID}&scope=user.info.basic,video.upload&response_type=code&redirect_uri=${encodeURIComponent(
        process.env.TIKTOK_REDIRECT_URI
      )}&state=${userId}`;

      return tiktokAuthUrl;

    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
};

// Handle OAuth callback for a specific platform and save tokens
exports.handleOAuthCallback = async (userId, code, platform) => {
  try {
    let tokens, platformUserId;

    switch (platform) {
      case 'youtube': {
        const { tokens: youtubeTokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(youtubeTokens);

        platformUserId = await getUserInfo(youtubeTokens.refresh_token);

        tokens = youtubeTokens;
        break;
      }

      case 'tiktok': {
        const tokenResponse = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
          client_key: process.env.TIKTOK_CLIENT_ID,
          client_secret: process.env.TIKTOK_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
        });

        const tiktokTokens = tokenResponse.data.data;
        if (!tiktokTokens) {
          throw new Error('Failed to retrieve TikTok tokens.');
        }

        platformUserId = tiktokTokens.open_id;
        tokens = {
          access_token: tiktokTokens.access_token,
          refresh_token: tiktokTokens.refresh_token || null,
        };
        break;
      }

      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    const existingAccount = await LinkedAccount.findOne({
      where: { user_id: userId, platform, platform_user_id: platformUserId },
    });

    if (existingAccount) {
      // await LinkedAccount.update({ active: false }, { where: { user_id: userId, platform } });

      await existingAccount.update({
        active: true,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        linked_at: new Date(),
      });

      console.log(`Updated account ${platformUserId} to active for user_id: ${userId}`);
      return existingAccount;
    } else {
      // await LinkedAccount.update({ active: false }, { where: { user_id: userId, platform } });

      const linkedAccount = await LinkedAccount.create({
        user_id: userId,
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        platform_user_id: platformUserId || 'unknown_user',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        linked_at: new Date(),
        active: true,
      });

      console.log(`Created new account ${platformUserId} and set to active for user_id: ${userId}`);
      return linkedAccount;
    }
  } catch (error) {
    console.error(`Error handling ${platform} OAuth callback:`, error.message);
    throw new Error(`Failed to handle ${platform} OAuth callback.`);
  }
};

const getUserInfo = async (refreshToken) => {
  try {
    // Set the credentials
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    // Use the People API to fetch user profile information
    const peopleService = google.people({ version: 'v1', auth: oauth2Client });

    const response = await peopleService.people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses,photos',
    });

    const user = response.data;
    const name = user.names?.[0]?.displayName || 'Unknown';
    const email = user.emailAddresses?.[0]?.value || 'Unknown';
    const picture = user.photos?.[0]?.url || 'Unknown';
    const id = email; // You can use the email as a unique identifier

    console.log('User Info:', { id, name, email, picture });

    return id; // Use the email as the unique platform_user_id
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    throw error;
  }
};

exports.revokeRefreshToken = async (userId, platform) => {
  try {
    // Find the active linked account for the user and platform
    const linkedAccount = await LinkedAccount.findOne({
      where: { user_id: userId, platform, active: true },
    });

    if (!linkedAccount) {
      throw new Error(`No active linked account found for platform: ${platform}`);
    }

    const { refresh_token } = linkedAccount;

    if (!refresh_token) {
      throw new Error('No refresh token found for the linked account.');
    }

    switch (platform) {
      case 'youtube': {
        // Initialize the OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          process.env.REDIRECT_URI
        );

        // Revoke the refresh token
        const revokeResponse = await oauth2Client.revokeToken(refresh_token);

        if (revokeResponse.status === 200) {
          console.log(`Successfully revoked YouTube refresh token for user_id: ${userId}`);
        } else {
          throw new Error('Failed to revoke YouTube refresh token.');
        }
        break;
      }

      // Other platform cases like TikTok can go here...
      default:
        throw new Error(`Unsupported platform for revocation: ${platform}`);
    }

    // Mark the linked account as inactive after revocation
    await linkedAccount.update({ active: false });
    console.log(`Deactivated linked account for platform: ${platform}, user_id: ${userId}`);
  } catch (error) {
    console.error(`Error revoking refresh token for ${platform}:`, error.message);
    throw new Error(`Failed to revoke refresh token for ${platform}.`);
  }
};
