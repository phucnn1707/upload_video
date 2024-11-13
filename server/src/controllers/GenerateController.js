const OpenAIService = require('../services/OpenAIService');

async function generateText(req, res) {
  const { keyword } = req.body;

  // Check if keyword is provided
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'Keyword is required', data: null });
  }

  try {
    // Generate text using OpenAI service
    const response = await OpenAIService.generateTextFromKeyword(keyword);
    const { generatedTitle, generatedText } = response;

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Text generated successfully',
      data: { keyword, generatedTitle, generatedText },
    });
  } catch (error) {
    // Return error response with structured format
    return res.status(500).json({
      success: false,
      message: 'Failed to generate text',
      data: null,
      error: error.message,
    });
  }
}

module.exports = {
  generateText,
};
