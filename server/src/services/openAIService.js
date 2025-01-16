const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTextFromKeyword(keyword, options = {}) {
  const { desiredContent, characterLimit } = options;

  if (!keyword) {
    throw new Error('Keyword is required.');
  }

  const maxRetries = 3; // Define maximum retry attempts
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      const inputPrompt = createInputPrompt(keyword, desiredContent, characterLimit);

      console.log(`Generated Prompt (Attempt ${attempt}):`, inputPrompt);

      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: inputPrompt }],
        model: 'gpt-4',
      });

      const content = response.choices[0]?.message?.content || '';
      console.log(`OpenAI Response (Attempt ${attempt}):`, content);

      const { generatedTitle, generatedText } = parseGeneratedContent(content);

      return { generatedTitle, generatedText }; // Return valid result if successful
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt >= maxRetries) {
        throw new Error('Failed to generate valid content after multiple attempts.');
      }
    }
  }
}

function createInputPrompt(keyword, userDescription, temp) {
  const defaultInstruction = `
    Write a creative, engaging, and dynamic script that resonates with a Japanese audience. 
    Focus on delivering a memorable and impactful message about the keyword: "${keyword}".
  `.trim();

  const instruction = userDescription && userDescription.trim() ? userDescription.trim() : defaultInstruction;

  // Prompt
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

function parseGeneratedContent(content) {
  // Ensure that content contains "---" separator
  if (!content.includes('---')) {
    throw new Error('Generated content does not include a valid title and text separator ("---").');
  }

  // Split content into title and text
  const [generatedTitle, generatedText] = content.split('---').map(
    (part) =>
      part
        .trim()
        .replace(/^["'“”‘’]|["'“”‘’]$/g, '') // Remove surrounding quotes
        .replace(/\r?\n|\r/g, '') // Remove line breaks
  );

  // Validate that both parts exist
  if (!generatedTitle || !generatedText) {
    throw new Error('Generated content is incomplete: Missing title or text.');
  }

  return {
    generatedTitle,
    generatedText,
  };
}

module.exports = {
  generateTextFromKeyword,
};
