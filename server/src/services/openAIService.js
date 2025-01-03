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

function createInputPrompt(keyword, desiredContent, characterLimit) {
  const durationInstruction = characterLimit
    ? `Create engaging content close to ${characterLimit} characters but do not exceed this limit.`
    : `The content should be suitable for spoken delivery in under 60 seconds.`;

  return `
    Write an engaging and captivating script in Japanese for the keyword: "${keyword}".
    Start with a short and catchy title to immediately grab attention, followed by "---", and an engaging paragraph that keeps the listener interested.
    Use a conversational tone, include interesting facts or examples, and evoke curiosity or emotions relevant to the keyword.
    ${desiredContent ? `Focus on specific details or examples about: "${desiredContent}".` : ''}
    ${durationInstruction}
    Ensure the content is dynamic, easy to understand, and leaves a strong impression on the listener.
    Avoid complex sentences; use clear and impactful language to make the message memorable.
    Return the result in a single paragraph with no line breaks or formatting.
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
