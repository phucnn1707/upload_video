const db = require('../models');
const { AvatarAI } = db;

const createAvatar = async (name, avatarUrl, voice_id, type) => {
  if (!name) {
    throw new Error('Name is required');
  }

  if (!avatarUrl) {
    throw new Error('Avatar URL is required');
  }

  if (!voice_id) {
    throw new Error('Voice is required');
  }

  if (!type) {
    throw new Error('Type is required');
  }

  return await AvatarAI.create({ avatar_name: name, avatar_url: avatarUrl, voice_id: voice_id, type: type });
};

const getAllAvatars = async () => {
  return await AvatarAI.findAll({
    attributes: ['id', 'avatar_name', 'avatar_url', 'voice_id', 'type', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'ASC']],
  });
};

module.exports = { createAvatar, getAllAvatars };
