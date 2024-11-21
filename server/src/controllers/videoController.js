const VideoService = require('../services/videoService');

// Create a new Video
const createVideo = async (req, res) => {
  const { script_id, video_url, image_url, srt_file_url, duration } = req.body;
  const user_id = req.user?.id;

  if (!user_id || !script_id || !video_url || !srt_file_url || !duration) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: user_id, script_id, video_url, srt_file_url, duration',
      data: null,
    });
  }

  try {
    const newVideo = await VideoService.createVideo({
      user_id,
      script_id,
      video_url,
      srt_file_url,
      duration,
      image_url,
    });
    res.status(201).json({ success: true, message: 'Video created successfully', data: newVideo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Get all Videos
const getVideos = async (req, res) => {
  try {
    const videos = await VideoService.getVideos();
    res.status(200).json({ success: true, message: 'Videos retrieved successfully', data: videos });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Get a Video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await VideoService.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found', data: null });
    }
    res.status(200).json({ success: true, message: 'Video retrieved successfully', data: video });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Update a Video by ID
const updateVideo = async (req, res) => {
  try {
    const updatedVideo = await VideoService.updateVideo(req.params.id, req.body);
    if (!updatedVideo) {
      return res.status(404).json({ success: false, message: 'Video not found', data: null });
    }
    res.status(200).json({ success: true, message: 'Video updated successfully', data: updatedVideo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

// Delete a Video by ID
const deleteVideo = async (req, res) => {
  try {
    const result = await VideoService.deleteVideo(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Video not found', data: null });
    }
    res.status(200).json({ success: true, message: 'Video deleted successfully', data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

module.exports = { createVideo, getVideos, getVideoById, updateVideo, deleteVideo };
