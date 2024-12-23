const youtubeService = require('../services/youtubeService');

// Upload video endpoint
exports.uploadVideo = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure `userId` is injected by authentication middleware
    const { id: videoId } = req.params; // Video ID passed as a route parameter

    // Validate video ID
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required.' });
    }

    // Call the YouTube upload service with the user ID and video ID
    const uploadResponse = await youtubeService.uploadVideoById(userId, videoId);

    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully.',
      data: uploadResponse,
    });
  } catch (error) {
    console.error('Error uploading video:', error.message);

    // Return an enhanced error response
    res.status(500).json({
      error: error.message || 'An unexpected error occurred while uploading the video.',
    });
  }
};
