const db = require('../models');
const { Keyword } = db;

// Service to create a new keyword
const createKeyword = async ({ platform, keyword, trending_date }) => {
  // Check if the keyword already exists for the platform and date
  const existingKeyword = await Keyword.findOne({
    where: { platform, keyword, trending_date: new Date(trending_date).setHours(0, 0, 0, 0) },
  });
  if (existingKeyword) {
    throw new Error('Keyword already exists for this platform and date');
  }

  // Create and return the new keyword
  return await Keyword.create({ platform, keyword, trending_date });
};

// Service to get all keywords
const getAllKeywords = async () => {
  return await Keyword.findAll({
    attributes: ['keyword_id', 'platform', 'keyword', 'trending_date', 'createdAt', 'updatedAt'],
  });
};

module.exports = { createKeyword, getAllKeywords };
