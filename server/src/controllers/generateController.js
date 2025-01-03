const OpenAIService = require('../services/openAIService');
const VideoGenerationService = require('../services/videoGenerationService');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const VideoService = require('../services/videoService');
const TextScriptService = require('../services/textScriptService');

const fontPath = path.resolve(__dirname, '../assets/fonts/NotoSansJP-VariableFont_wght.ttf');

const generateText = async (req, res) => {
  const { keyword, options = {} } = req.body;

  // Check if keyword is provided
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'Keyword is required', data: null });
  }

  try {
    // Generate text using OpenAI service
    const response = await OpenAIService.generateTextFromKeyword(keyword, options);
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
  const { textScriptId, avatarUrl, voice_id, type } = req.body;
  const user_id = req.user?.id;

  // Validate required fields
  if (!textScriptId || !avatarUrl || !voice_id || !type || !user_id) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: textScriptId, avatarUrl, voice, type or user_id',
      data: null,
    });
  }

  try {
    // Get title from textScriptId
    const textScriptDetails = await TextScriptService.getTextScriptById(textScriptId);
    const title = textScriptDetails?.title || 'Default Title';

    console.log('Requesting video generation...');
    const videoData = await VideoGenerationService.generateVideoFromTextScript(textScriptId, avatarUrl, voice_id, type);

    if (videoData.status !== 'created') {
      return res.status(400).json({
        success: false,
        message: 'Video generation did not start properly',
        data: null,
      });
    }

    console.log('Polling for video readiness...');
    const videoId = 'tlk_UCkjO5uBx73K34ghMiZMJ';
    const videoDetails = await pollVideoStatus(videoData.id);
    // const videoDetails = await pollVideoStatus(videoId);

    if (!videoDetails || videoDetails.status !== 'done') {
      return res.status(400).json({
        success: false,
        message: 'Video is not ready after the maximum wait time',
        data: null,
      });
    }

    console.log('Downloading video and subtitles...');
    const { videoPath, subtitlesPath } = await saveVideoFiles(videoDetails, videoData.id);
    // const { videoPath, subtitlesPath } = await saveVideoFiles(videoDetails, videoId);

    console.log('Processing subtitles for line breaking...');
    await processSrtFile(subtitlesPath, subtitlesPath, 15);

    console.log('Merging subtitles into video...');
    const mergedVideoPath = path.resolve(path.dirname(videoPath), `merged_${videoData.id}.mp4`);
    // const mergedVideoPath = path.resolve(path.dirname(videoPath), `merged_${videoId}.mp4`);
    await mergeSubtitlesIntoVideo(videoPath, subtitlesPath, mergedVideoPath, title);

    console.log('Saving video details to database...');
    const newVideo = await VideoService.createVideo({
      user_id,
      script_id: textScriptId,
      video_url: `/public/video/merged_${videoData.id}.mp4`,
      srt_file_url: `/public/video/${videoData.id}.srt`,
      // video_url: `/public/video/merged_${videoId}.mp4`,
      // srt_file_url: `/public/video/${videoId}.srt`,
      duration: videoDetails.duration,
      image_url: avatarUrl,
    });

    res.status(200).json({
      success: true,
      message: 'AI Video generated, downloaded, and saved successfully',
      data: {
        videoId: videoData.id,
        // videoId: videoId,
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

const splitLongText = (text, maxLength = 40) => {
  const lines = [];
  let line = '';

  for (let i = 0; i < text.length; i++) {
    line += text[i];

    if (line.length >= maxLength) {
      lines.push(line.trim());
      line = '';
    }
  }

  if (line) lines.push(line.trim());

  return lines.join('\n'); // Ngắt dòng bằng ký tự \n
};

const processSrtFile = (inputPath, outputPath, maxLength = 40) => {
  try {
    const srtContent = fs.readFileSync(inputPath, 'utf-8');
    const srtLines = srtContent.split('\n');

    let result = '';
    let text = '';

    for (const line of srtLines) {
      if (line.match(/^\d+$/) || line.match(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/)) {
        if (text) {
          result += `${splitLongText(text, maxLength)}\n\n`;
          text = '';
        }
        result += `${line}\n`;
      } else if (line.trim() === '') {
        if (text) {
          result += `${splitLongText(text, maxLength)}\n\n`;
          text = '';
        }
      } else {
        text += ` ${line.trim()}`;
      }
    }

    if (text) {
      result += `${splitLongText(text, maxLength)}\n`;
    }

    fs.writeFileSync(outputPath, result.trim());
    console.log(`Processed SRT file saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error processing SRT file:', error.message);
  }
};

const POLLING_INTERVAL_MS = 5000;
const MAX_RETRIES = 120;

const pollVideoStatus = async (videoId) => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const videoDetails = await VideoGenerationService.getGeneratedVideoDetails(videoId);

    // Check if video generation is complete and required URLs are available
    if (videoDetails.status === 'done' && videoDetails.result_url && videoDetails.subtitles_url) {
      return videoDetails;
    }

    // Log a message if URLs are missing
    if (videoDetails.status === 'done' && (!videoDetails.result_url || !videoDetails.subtitles_url)) {
      console.warn(`Video details are incomplete. Missing URLs. Retrying (${retries + 1}/${MAX_RETRIES})...`);
    }

    // Wait for the next poll
    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL_MS));
    retries++;
  }

  return null; // Return null if video is not ready or URLs are missing within the retry limit
};

// Retry file download
const retryDownloadFile = async (url, outputPath) => {
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await VideoGenerationService.downloadFile(url, outputPath);
      console.log(`Download succeeded: ${outputPath}`);
      return;
    } catch (error) {
      console.warn(`Download failed (${attempt + 1}/${MAX_RETRIES}): ${error.message}`);
      if (attempt === MAX_RETRIES - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

// Merge subtitles into video using FFmpeg
const mergeSubtitlesIntoVideo = async (videoPath, srtPath, outputPath, title) => {
  // const formattedTitle = splitLongText(title, 10).replace(/\n/g, '\\\\n').replace(/'/g, "\\'");
  // console.log(formattedTitle);

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .videoFilter([
        `subtitles=${srtPath}:force_style='FontName=Noto Sans JP,Fontsize=14,Alignment=2,MarginV=50'`,
        `drawtext=text='${title}':box=1:boxcolor=black@0.5:boxborderw=10:fontcolor=white:fontsize=30:x=(w-text_w)/2:y=50:fontfile=${fontPath}`,
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .run();
  });
};

// Save video and subtitles files
const saveVideoFiles = async (videoDetails, videoId) => {
  const videoFolder = path.resolve(__dirname, '../../public/video/');

  if (!fs.existsSync(videoFolder)) {
    fs.mkdirSync(videoFolder, { recursive: true });
  }

  const videoPath = path.resolve(videoFolder, `${videoId}.mp4`);
  const subtitlesPath = path.resolve(videoFolder, `${videoId}.srt`);

  console.log('Downloading video file...');
  await retryDownloadFile(videoDetails.result_url, videoPath);

  console.log('Downloading subtitles file...');
  await retryDownloadFile(videoDetails.subtitles_url, subtitlesPath);

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
