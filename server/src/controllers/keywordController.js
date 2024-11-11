const keywordService = require('../services/keywordService');

// Controller to handle keyword creation
const createKeyword = async (req, res) => {
  const { platform, keyword, trending_date } = req.body;
  try {
    const result = await keywordService.createKeyword({ platform, keyword, trending_date });
    res.status(201).json({ success: true, message: 'Keyword created successfully', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to retrieve all keywords
const getAllKeywords = async (req, res) => {
  try {
    const keywords = await keywordService.getAllKeywords();
    res.status(200).json({ success: true, data: keywords });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching keywords' });
  }
};

module.exports = { createKeyword, getAllKeywords };
