const db = require('../models');
const { AvatarAI } = db;

const createAvatar = async (avatarUrl) => {
  if (!avatarUrl) {
    throw new Error('Avatar URL is required');
  }

  return await AvatarAI.create({ avatar_url: avatarUrl });
};

const getAllAvatars = async () => {
  return await AvatarAI.findAll({
    attributes: ['id', 'avatar_url', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });
};

module.exports = { createAvatar, getAllAvatars };
