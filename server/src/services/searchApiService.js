// services/searchService.js
const axios = require('axios');
const db = require('../models');
const { Keyword } = db;

const API_KEY = process.env.SEARCH_API_KEY;
const SEARCH_API_URL = process.env.SEARCH_API_URL;

const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

const getGoogleTrendingKeywords = (data) => {
  const trendingKeywords = [];
  if (data && data.daily_searches) {
    data.daily_searches.forEach((dailySearch) => {
      dailySearch.searches.forEach((search) => {
        trendingKeywords.push(search.query);
      });
    });
  }
  return trendingKeywords;
};

const getYouTubeTrendingKeywords = (data) => {
  const trendingKeywords = [];
  if (data && data.trending) {
    data.trending.forEach((item) => {
      trendingKeywords.push(item.title);
    });
  }
  return trendingKeywords;
};

// Google Trends function
const fetchGoogleTrends = async () => {
  try {
    const params = {
      engine: 'google_trends_trending_daily',
      geo: 'VN',
      date,
      api_key: API_KEY,
    };

    const response = await axios.get(SEARCH_API_URL, { params });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return getGoogleTrendingKeywords(response.data);
  } catch (error) {
    console.error('Error in fetchGoogleTrends:', error);
    throw error;
  }
};

// YouTube Trends function
const fetchYouTubeTrends = async () => {
  try {
    const params = {
      engine: 'youtube_trends',
      gl: 'VN',
      hl: 'vi',
      api_key: API_KEY,
    };

    const response = await axios.get(SEARCH_API_URL, { params });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return getYouTubeTrendingKeywords(response.data);
  } catch (error) {
    console.error('Error in fetchYouTubeTrends:', error);
    throw error;
  }
};

module.exports = { fetchGoogleTrends, fetchYouTubeTrends };
