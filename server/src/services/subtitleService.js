const axios = require('axios');
const fs = require('fs/promises');

const fetchSubtitleContent = async (fileUrl) => {
  try {
    // Fetch file content via HTTP
    const response = await axios.get(fileUrl, { responseType: 'text' });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch subtitle content: ' + error.message);
  }
};

const updateSubtitleContent = async (content, filePath) => {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('Error updating subtitle in service:', error);
    throw error;
  }
};

module.exports = {
  fetchSubtitleContent,
  updateSubtitleContent,
};
