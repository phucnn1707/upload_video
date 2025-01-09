const { fetchGoogleTrends, fetchYouTubeTrends } = require('../services/searchApiService');
const db = require('../models');
const { ApiKey, User } = db;

// Helper function to compare dates (ignoring time)
const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

// Controller function to fetch both Google and YouTube Trends
const fetchTrends = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is set in req.user after authentication middleware

  try {
    // Fetch user data to check last_fetched_trending_date
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const today = new Date();
    const lastFetchedDate = user.last_fetched_trending_date;

    // Check if trends have already been fetched today
    if (lastFetchedDate && isSameDay(lastFetchedDate, today)) {
      return res.status(200).json({
        success: true,
        message: 'Trending keywords already fetched for today',
        data: {
          googleTrends: [],
          youtubeTrends: [],
        },
      });
    }

    // Get API key for service name 'searchapi'
    const apiKeyRecord = await ApiKey.findOne({
      where: {
        user_id: userId,
        service_name: 'searchapi',
      },
    });

    if (!apiKeyRecord || !apiKeyRecord.api_key) {
      return res.status(400).json({
        success: false,
        message: 'API key for searchapi is not found',
      });
    }

    const apiKey = apiKeyRecord.api_key;

    // Fetch Google and YouTube trends concurrently
    const [googleTrends, youtubeTrends] = await Promise.all([fetchGoogleTrends(apiKey), fetchYouTubeTrends(apiKey)]);

    // Update user's last_fetched_trending_date
    user.last_fetched_trending_date = today;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Google and YouTube trending keywords retrieved successfully',
      data: {
        googleTrends,
        youtubeTrends,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending keywords',
      error: error.message,
    });
  }
};

module.exports = {
  fetchTrends,
};
