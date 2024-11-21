const axios = require('axios');
const db = require('../models');
const { TextScript } = db;
const fs = require('fs');

const API_KEY = process.env.DID_API_KEY;
const API_URL = process.env.DID_API_URL;

class VideoGenerationService {
  static async generateVideoFromTextScript(textScriptId, avatarUrl) {
    try {
      // Fetch the text script from the database
      const textScript = await TextScript.findByPk(textScriptId);
      if (!textScript) {
        throw new Error('TextScript not found');
      }

      // Configure API request
      const options = {
        method: 'POST',
        url: `${API_URL}/talks`,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${API_KEY}`,
        },
        data: {
          source_url: avatarUrl,
          script: {
            type: 'text',
            subtitles: true,
            provider: { type: 'microsoft', voice_id: 'ja-JP-ShioriNeural' },
            input: textScript.text_content,
            ssml: true,
          },
          config: {
            fluent: 'false',
            pad_audio: '0.0',
            result_format: 'mp4',
            auto_match: true,
            sharpen: true,
            stitch: true,
            normalization_factor: 1,
            motion_factor: 1,
          },
        },
      };

      // Call D-ID API to generate video
      const response = await axios.request(options);

      // Return API response
      return response.data;
    } catch (error) {
      throw new Error('Failed to generate video: ' + error.message);
    }
  }

  static async getGeneratedVideoDetails(id) {
    try {
      const options = {
        method: 'GET',
        url: `${API_URL}/talks/${id}`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve video details: ' + error.message);
    }
  }

  static async downloadFile(fileUrl, destinationPath) {
    try {
      // Create a writable stream for the file
      const writer = fs.createWriteStream(destinationPath);

      // Make an HTTP GET request to fetch the file as a stream
      const response = await axios.get(fileUrl, {
        responseType: 'stream',
      });

      // Pipe the response data into the writable stream
      response.data.pipe(writer);

      // Return a promise that resolves when the file is fully written
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve); // Resolve the promise on success
        writer.on('error', reject); // Reject the promise on error
      });
    } catch (error) {
      throw new Error(`Failed to download file from ${fileUrl}: ${error.message}`);
    }
  }
}

module.exports = VideoGenerationService;
