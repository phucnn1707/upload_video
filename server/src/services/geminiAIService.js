const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

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

  const { desiredTitle, desiredContent, characterLimit } = options;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const inputPrompt = createInputPrompt(keyword, desiredContent, characterLimit, desiredTitle);
      console.log(`Generated Prompt (Attempt ${attempt}):`, inputPrompt);

      const result = await model.generateContent(inputPrompt);
      const content = result.response?.text() || '';
      console.log(`AI Response (Attempt ${attempt}):`, content);

      return { generatedTitle: desiredTitle, generatedText: content };
      // return parseGeneratedContent(content);
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
function createInputPrompt(keyword, userDescription, characterLimit, desiredTitle) {
  const defaultInstruction = `
    Write a creative, engaging, and dynamic script that resonates with a Japanese audience. 
    Focus on delivering a memorable and impactful message about the keyword: "${keyword}".
  `.trim();

  const instruction = userDescription?.trim() || defaultInstruction;

  const title = desiredTitle?.trim() || `An engaging script about "${keyword}"`;

  return `
Act like a professional Japanese content writer and editor. You specialize in crafting engaging, culturally relevant, and grammatically impeccable content in Japanese, tailored to diverse audiences and industries. You have extensive experience in writing articles optimized for various formats and requirements, including blogs, magazines, and SEO-driven content.

Objective: Write a professional, engaging, and captivating article in Japanese based on the provided keyword: "${keyword}". Follow any specific instructions, such as "${instruction}", with precision. Ensure the tone and style align with the intended audience, purpose, or platform.

Detailed Requirements:
1. Character Count Compliance:
   - For an exact character count, ensure the article matches the specified number exactly, including spaces and punctuation.
   - If a maximum character limit is given, strictly adhere to this limit and avoid exceeding it.
   - For a character range, maintain the article's length within the specified boundaries.
   - When a minimum character count is required, ensure the content meets or exceeds this threshold.

2. Content Expectations:
   - Ensure the article is concise, well-structured, and free from unnecessary words to meet the specified character requirements.
   - Craft engaging openings, informative body sections, and compelling conclusions.
   - Adapt tone and style based on the purpose (e.g., formal, casual, or persuasive) and target audience.
   - Where contextually appropriate, incorporate relevant details or enhancements for reader engagement.
   - Ensure that all paragraphs are directly connected with no blank lines or extra spaces between them. Use a newline character ('\n') immediately after each paragraph to separate them.

3. Output Specifics:
   - Provide only the article text without any extraneous notes or instructions.
   - Maintain a focus on clarity and flow, with an emphasis on keyword integration if needed.
   - Ensure paragraphs are separated by a single newline character ('\n') only, and there are no blank lines between them.

4. Editing for Precision: After completing the draft, review and refine it to ensure it aligns with the given instructions and meets all requirements effectively.

Final Note: Take a deep breath and approach this task step-by-step, ensuring each requirement is fulfilled with meticulous attention to detail.

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

  const [generatedTitle, generatedText] = content.split('---').map(
    (part) => part.trim().replace(/^["'“”‘’]|["'“”‘’]$/g, '')
    // .replace(/\r?\n|\r/g, '')
  );

  if (!generatedTitle || !generatedText) {
    throw new Error('Generated content is incomplete: Missing title or text.');
  }

  return { generatedTitle, generatedText };
}

module.exports = { generateTextFromKeyword };
