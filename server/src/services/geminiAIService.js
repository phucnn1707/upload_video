const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Generate text based on a keyword with optional customization.
 * @param {string} keyword - The keyword for generating content.
 * @param {Object} options - Optional customization options.
 * @param {string} [options.desiredContent] - User's custom content description.
 * @param {number} [options.characterLimit] - Character limit for the output.
 * @returns {Promise<Object>} - Generated title and text.
 */
async function generateTextFromKeyword(keyword, options = {}) {
  if (!keyword) throw new Error('Keyword is required.');

  const { desiredContent, characterLimit } = options;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const inputPrompt = createInputPrompt(keyword, desiredContent, characterLimit);
      console.log(`Generated Prompt (Attempt ${attempt}):`, inputPrompt);

      const result = await model.generateContent(inputPrompt);
      const content = result.response?.text() || '';
      console.log(`AI Response (Attempt ${attempt}):`, content);

      return parseGeneratedContent(content);
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) {
        throw new Error('Failed to generate valid content after multiple attempts.');
      }
    }
  }
}

/**
 * Create input prompt for the AI model.
 * @param {string} keyword - The keyword for the content.
 * @param {string} userDescription - Custom instructions from the user.
 * @param {number} temp - Additional parameter (unused, included for extensibility).
 * @returns {string} - Generated input prompt.
 */
function createInputPrompt(keyword, userDescription, temp) {
  const defaultInstruction = `
    Write a creative, engaging, and dynamic script that resonates with a Japanese audience. 
    Focus on delivering a memorable and impactful message about the keyword: "${keyword}".
  `.trim();

  const instruction = userDescription?.trim() || defaultInstruction;

  return `
    Act like a professional scriptwriter with expertise in creating captivating Japanese scripts for diverse audiences.
    Your goal is to create an engaging and dynamic script for the keyword: "${keyword}".

    User's Custom Instructions:
    - ${instruction}

    Requirements:
    1. Start with a short and captivating title in Japanese that immediately grabs attention.
    2. Follow the title with "---" and write a single, cohesive paragraph:
       - Use a conversational tone and include elements that resonate with the audience.
       - Ensure the output aligns with the user's description provided above.

    Writing Guidelines:
    - Use clear, impactful, and easy-to-understand language.
    - Avoid unnecessary complexity while ensuring emotional and intellectual depth.
    - Make the content memorable and leave a strong impression.

    Output Format:
    - Return the result as a single cohesive paragraph with no line breaks or unnecessary formatting.
  `.trim();
}

/**
 * Parse the generated content into title and text.
 * @param {string} content - The raw generated content.
 * @returns {Object} - Parsed title and text.
 */
function parseGeneratedContent(content) {
  if (!content.includes('---')) {
    throw new Error('Generated content does not include a valid title and text separator ("---").');
  }

  const [generatedTitle, generatedText] = content.split('---').map((part) =>
    part
      .trim()
      .replace(/^["'“”‘’]|["'“”‘’]$/g, '')
      .replace(/\r?\n|\r/g, '')
  );

  if (!generatedTitle || !generatedText) {
    throw new Error('Generated content is incomplete: Missing title or text.');
  }

  return { generatedTitle, generatedText };
}

module.exports = { generateTextFromKeyword };
