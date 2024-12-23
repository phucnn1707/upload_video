const { google } = require('googleapis');
const db = require('../models');
const { LinkedAccount, Video, TextScript } = db;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const YOUTUBE_REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI;

const youtube = google.youtube('v3');

const oauth2Client = new google.auth.OAuth2(YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REDIRECT_URI);

exports.uploadVideoById = async (userId, videoId) => {
  try {
    const video = await Video.findOne({ where: { video_id: videoId } });
    if (!video) {
      throw new Error('Video not found.');
    }

    const script = await TextScript.findOne({ where: { script_id: video.script_id } });
    if (!script) {
      throw new Error('Script not found for this video.');
    }

    const videoMetadata = {
      title: script.title || 'Untitled Video',
      description: script.content || 'No description provided.',
      tags: script.tags || [],
      categoryId: '22',
      privacyStatus: 'private',
    };

    const linkedAccount = await LinkedAccount.findOne({
      where: { user_id: userId, platform: 'Youtube' },
    });

    if (!linkedAccount || !linkedAccount.refresh_token) {
      throw new Error('No refresh token found for this user.');
    }

    oauth2Client.setCredentials({
      refresh_token: linkedAccount.refresh_token,
    });

    const videoPath = path.join(__dirname, '../../', video.video_url);

    if (!fs.existsSync(videoPath)) {
      throw new Error(`Video file not found at path: ${video.video_url}`);
    }

    // Upload video to YouTube
    const response = await youtube.videos.insert({
      auth: oauth2Client,
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: videoMetadata.title,
          description: videoMetadata.description,
          tags: videoMetadata.tags,
          categoryId: videoMetadata.categoryId,
        },
        status: {
          privacyStatus: videoMetadata.privacyStatus,
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    if (!response || !response.data || !response.data.id) {
      throw new Error('Upload to YouTube failed. No video ID returned.');
    }

    console.log('Video uploaded successfully');

    await Video.update(
      {
        is_uploaded: true,
        uploaded_at: new Date(), // Set current date and time
      },
      { where: { video_id: videoId } }
    );

    console.log('Video upload status updated in the database.');
    return response.data;
  } catch (error) {
    console.error('Error uploading video to YouTube:', error.message);

    if (error.response && error.response.data) {
      console.error('YouTube API Error:', error.response.data.error);
    }

    throw new Error(error.message || 'Failed to upload video to YouTube.');
  }
};
