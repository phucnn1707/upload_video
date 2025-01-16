// services/searchService.js
const axios = require('axios');
const db = require('../models');
const { Keyword } = db;

const API_KEY = process.env.SEARCH_API_KEY;
const SEARCH_API_URL = process.env.SEARCH_API_URL;

const date = new Date();
date.setHours(0, 0, 0, 0);
const apiDate = new Date();
apiDate.setHours(0, 0, 0, 0);
const strDate = apiDate.toISOString().slice(0, 10).replace(/-/g, '');

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

const createKeywords = async (keywords, platform) => {
  const keywordEntries = keywords.map((keyword) => ({
    platform,
    keyword: keyword.replace(/\s+/g, ''),
    trending_date: date,
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await Keyword.bulkCreate(keywordEntries, {
    ignoreDuplicates: true,
  });
};

// Google Trends function
const fetchGoogleTrends = async (api_key) => {
  try {
    const params = {
      engine: 'google_trends_trending_daily',
      geo: 'JP',
      date: strDate,
      api_key: api_key,
    };

    const response = await axios.get(SEARCH_API_URL, { params });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const googleKeywords = getGoogleTrendingKeywords(response.data);
    await createKeywords(googleKeywords, 'Google');
    return googleKeywords;
  } catch (error) {
    console.error('Error in fetchGoogleTrends:', error);
    throw error;
  }
};

// YouTube Trends function
const fetchYouTubeTrends = async (api_key) => {
  try {
    const params = {
      engine: 'youtube_trends',
      gl: 'JP',
      hl: 'ja',
      api_key: api_key,
    };

    const response = await axios.get(SEARCH_API_URL, { params });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const youtubeKeywords = getYouTubeTrendingKeywords(response.data);
    await createKeywords(youtubeKeywords, 'YouTube');
    return youtubeKeywords;
  } catch (error) {
    console.error('Error in fetchYouTubeTrends:', error);
    throw error;
  }
};

module.exports = { fetchGoogleTrends, fetchYouTubeTrends };
