const OpenAIService = require('../services/OpenAIService');
const VideoGenerationService = require('../services/videoGenerationService');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const VideoService = require('../services/videoService');
const TextScriptService = require('../services/textScriptService');

const POLLING_INTERVAL_MS = 5000;
const MAX_RETRIES = 120;

const fontPath = path.resolve(__dirname, '../assets/fonts/NotoSansJP-VariableFont_wght.ttf');

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
    // Get title from textScriptId
    const textScriptDetails = await TextScriptService.getTextScriptById(textScriptId);
    const title = textScriptDetails?.title || 'Default Title';

    // Step 1: Request video generation
    console.log('Requesting video generation...');
    // const videoData = await VideoGenerationService.generateVideoFromTextScript(textScriptId, avatarUrl);

    // if (videoData.status !== 'created') {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Video generation did not start properly',
    //     data: null,
    //   });
    // }

    // Step 2: Poll for video readiness
    console.log('Polling for video readiness...');
    const videoId = 'tlk_iTXS_lyQq3DtBVmYmZ8JV';
    // const videoDetails = await pollVideoStatus(videoData.id);
    const videoDetails = await pollVideoStatus(videoId);

    if (!videoDetails || videoDetails.status !== 'done') {
      return res.status(400).json({
        success: false,
        message: 'Video is not ready after the maximum wait time',
        data: null,
      });
    }

    // Step 3: Download video and subtitles
    console.log('Downloading video and subtitles...');
    // const { videoPath, subtitlesPath } = await saveVideoFiles(videoDetails, videoData.id);
    const { videoPath, subtitlesPath } = await saveVideoFiles(videoDetails, videoId);

    // Step 4: Merge subtitles into video
    console.log('Merging subtitles into video...');
    // const mergedVideoPath = path.resolve(path.dirname(videoPath), `merged_${videoData.id}.mp4`);
    const mergedVideoPath = path.resolve(path.dirname(videoPath), `merged_${videoId}.mp4`);
    await mergeSubtitlesIntoVideo(videoPath, subtitlesPath, mergedVideoPath, title);

    // Step 5: Save video details to the database
    console.log('Saving video details to database...');
    const newVideo = await VideoService.createVideo({
      user_id,
      script_id: textScriptId,
      // video_url: `/public/video/merged_${videoData.id}.mp4`, // Public URL for video
      // srt_file_url: `/public/video/${videoData.id}.srt`, // Public URL for subtitles
      video_url: `/public/video/merged_${videoId}.mp4`, // Public URL for video
      srt_file_url: `/public/video/${videoId}.srt`, // Public URL for subtitles
      duration: videoDetails.duration,
      image_url: videoDetails.source_url, // Thumbnail image
    });

    // Step 5: Respond with success
    res.status(200).json({
      success: true,
      message: 'AI Video generated, downloaded, and saved successfully',
      data: {
        // videoId: videoData.id,
        videoId: videoId,
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

const mergeSubtitlesIntoVideo = async (videoPath, subtitlesPath, outputPath, title) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .videoFilter([
        `subtitles=${subtitlesPath}:force_style='FontName=Noto Sans JP,Fontsize=8,Alignment=2,MarginV=30'`,
        `drawtext=text=${title}:fontcolor=white:fontsize=30:x=(w-text_w)/2+1:y=50:fontfile=${fontPath}`,
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .run();
  });
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
  const videoFolder = path.resolve(__dirname, '../../public/video/');

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
