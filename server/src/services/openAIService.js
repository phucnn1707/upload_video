const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTextFromKeyword(keyword) {
  try {
    const inputPrompt = `Please ignore all previous instructions. Respond only in Japanese. Do not explain what you are doing, and do not self-reference. Write a short, engaging, and informative text in Japanese about the following keyword: "${keyword}". The text should be concise and designed for a spoken video of 30 to 60 seconds, focusing on key points that capture the viewer's interest.`;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: inputPrompt }],
      model: 'gpt-4o',
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text from OpenAI');
  }
}

module.exports = {
  generateTextFromKeyword,
};
