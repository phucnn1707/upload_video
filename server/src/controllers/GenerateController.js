const OpenAIService = require('../services/OpenAIService');

async function generateText(req, res) {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const generatedText = await OpenAIService.generateTextFromKeyword(keyword);
    return res.json({ keyword, generatedText });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  generateText,
};
