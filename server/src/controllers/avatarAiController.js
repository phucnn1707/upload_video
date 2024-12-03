const avatarAiService = require('../services/avatarAiService');

const createAvatar = async (req, res) => {
  const { avatar_url } = req.body;

  try {
    const avatar = await avatarAiService.createAvatar(avatar_url);
    res.status(201).json({ success: true, message: 'Avatar created successfully', data: avatar });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllAvatars = async (req, res) => {
  try {
    const avatars = await avatarAiService.getAllAvatars();
    res.status(200).json({ success: true, data: avatars });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch avatars' });
  }
};

module.exports = { createAvatar, getAllAvatars };
