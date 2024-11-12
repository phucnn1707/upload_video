const db = require('../models');
const { Keyword } = db;

// Service to create a new keyword
const createKeyword = async ({ platform, keyword, trending_date }) => {
  const parsedKeyword = keyword.replace(/\s+/g, ''); //remove all spaces

  return await Keyword.create({ platform, keyword: parsedKeyword, trending_date });
};

// Service to get all keywords
const getAllKeywords = async () => {
  return await Keyword.findAll({
    attributes: ['keyword_id', 'platform', 'keyword', 'trending_date', 'createdAt', 'updatedAt'],
  });
};

module.exports = { createKeyword, getAllKeywords };
