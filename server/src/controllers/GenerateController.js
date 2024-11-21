const OpenAIService = require('../services/OpenAIService');
const VideoGenerationService = require('../services/videoGenerationService');
const path = require('path');
const fs = require('fs');
const VideoService = require('../services/videoService');

const POLLING_INTERVAL_MS = 5000;
const MAX_RETRIES = 12;

const generateText = async (req, res) => {
  const { keyword } = req.body;

  // Check if keyword is provided
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'Keyword is required', data: null });
  }

  try {
    // Generate text using OpenAI service
    const response = await OpenAIService.generateTextFromKeyword(keyword);
    const { generatedTitle, generatedText } = response;

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Text generated successfully',
      data: { keyword, generatedTitle, generatedText },
    });
  } catch (error) {
    // Return error response with structured format
    return res.status(500).json({
      success: false,
      message: 'Failed to generate text',
      data: null,
      error: error.message,
    });
  }
};

const generateVideo = async (req, res) => {
  const { textScriptId, avatarUrl } = req.body;
  const user_id = req.user?.id; // Assuming authentication middleware sets req.user

  // Validate required fields
  if (!textScriptId || !avatarUrl || !user_id) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: textScriptId, avatarUrl, or user_id',
      data: null,
    });
  }

  try {
    // Step 1: Request video generation
    const videoData = await VideoGenerationService.generateVideoFromTextScript(textScriptId, avatarUrl);

    if (videoData.status !== 'created') {
      return res.status(400).json({
        success: false,
        message: 'Video generation did not start properly',
        data: null,
      });
    }

    // Step 2: Poll for video readiness
    const videoDetails = await pollVideoStatus(videoData.id);

    if (!videoDetails || videoDetails.status !== 'done') {
      return res.status(400).json({
        success: false,
        message: 'Video is not ready after the maximum wait time',
        data: null,
      });
    }

    // Step 3: Download video and subtitles
    const { videoPath, subtitlesPath } = await saveVideoFiles(videoDetails, videoData.id);

    // Step 4: Save video details to the database
    const newVideo = await VideoService.createVideo({
      user_id,
      script_id: textScriptId,
      video_url: videoPath, // Public URL for video
      srt_file_url: subtitlesPath, // Public URL for subtitles
      duration: videoDetails.duration,
      image_url: videoDetails.source_url, // Thumbnail image
    });

    // Step 5: Respond with success
    res.status(200).json({
      success: true,
      message: 'AI Video generated, downloaded, and saved successfully',
      data: {
        videoId: videoData.id,
        videoPath,
        subtitlesPath,
        newVideo,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const pollVideoStatus = async (videoId) => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const videoDetails = await VideoGenerationService.getGeneratedVideoDetails(videoId);

    if (videoDetails.status === 'done') {
      return videoDetails;
    }

    // Wait for the next poll
    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL_MS));
    retries++;
  }

  return null; // Return null if video is not ready within the retry limit
};

const saveVideoFiles = async (videoDetails, videoId) => {
  const videoFolder = path.resolve(__dirname, `../public/video/`);

  // Create the folder if it doesn't exist
  if (!fs.existsSync(videoFolder)) {
    fs.mkdirSync(videoFolder, { recursive: true });
  }

  const videoPath = path.resolve(videoFolder, `${videoId}.mp4`);
  const subtitlesPath = path.resolve(videoFolder, `${videoId}.srt`);

  // Download the video and subtitles
  await VideoGenerationService.downloadFile(videoDetails.result_url, videoPath);
  await VideoGenerationService.downloadFile(videoDetails.subtitles_url, subtitlesPath);

  return { videoPath, subtitlesPath };
};

const getGeneratedVideo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Missing required field: id',
      data: null,
    });
  }

  try {
    const videoDetails = await VideoGenerationService.getGeneratedVideoDetails(id);
    res.status(200).json({
      success: true,
      message: 'AI Video details retrieved successfully',
      data: videoDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  generateText,
  generateVideo,
  getGeneratedVideo,
};
