const { fetchSubtitleContent, updateSubtitleContent } = require('../services/subtitleService');
const fs = require('fs');
const path = require('path');

const getSubtitle = async (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.status(400).json({ message: 'File URL is required' });
  }

  try {
    const content = await fetchSubtitleContent(fileUrl);
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

const updateSubtitle = async (req, res) => {
  try {
    const { content } = req.body;
    const filePath = req.query.filePath;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    if (!filePath) {
      return res.status(400).json({ message: 'File path is required' });
    }

    const srt_file_url = path.join(__dirname, '/..', '/..', '' + filePath);

    if (!fs.existsSync(srt_file_url)) {
      return res.status(404).json({ message: 'File not found' });
    }

    await updateSubtitleContent(content, srt_file_url);

    return res.status(200).json({ message: 'Subtitle updated successfully' });
  } catch (error) {
    console.error('Error updating subtitle in controller:', error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = {
  getSubtitle,
  updateSubtitle,
};
