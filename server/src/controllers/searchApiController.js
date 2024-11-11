// controllers/trendingController.js

const { fetchGoogleTrends, fetchYouTubeTrends } = require('../services/searchApiService');

// Controller function to get Google Trends keywords
const getGoogleTrends = async (req, res) => {
  try {
    const googleTrendingKeywords = await fetchGoogleTrends();
    res.status(200).json({
      success: true,
      message: 'Google trending keywords retrieved successfully',
      data: googleTrendingKeywords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Google trending keywords',
      error: error.message,
    });
  }
};

// Controller function to get YouTube Trends keywords
const getYouTubeTrends = async (req, res) => {
  try {
    const youtubeTrendingKeywords = await fetchYouTubeTrends();
    res.status(200).json({
      success: true,
      message: 'YouTube trending keywords retrieved successfully',
      data: youtubeTrendingKeywords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve YouTube trending keywords',
      error: error.message,
    });
  }
};

module.exports = {
  getGoogleTrends,
  getYouTubeTrends,
};
