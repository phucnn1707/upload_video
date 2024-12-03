const db = require('../models');
const { Video, User, TextScript } = db;

class VideoService {
  // Create a new Video
  static async createVideo(data) {
    try {
      return await Video.create(data);
    } catch (error) {
      throw new Error('Failed to create Video: ' + error.message);
    }
  }

  // Get all Videos
  static async getVideos() {
    try {
      return await Video.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['user_id', 'username', 'email'],
          },
          {
            model: TextScript,
            as: 'textScript',
            attributes: ['script_id', 'title'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw new Error('Failed to retrieve Videos: ' + error.message);
    }
  }

  // Get a Video by ID
  static async getVideoById(id) {
    try {
      return await Video.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['user_id', 'username', 'email'],
          },
          {
            model: TextScript,
            as: 'textScript',
            attributes: ['script_id', 'title'],
          },
        ],
      });
    } catch (error) {
      throw new Error('Failed to retrieve Video: ' + error.message);
    }
  }

  // Update a Video by ID
  static async updateVideo(id, data) {
    try {
      const video = await Video.findByPk(id);
      if (!video) return null;
      return await video.update(data);
    } catch (error) {
      throw new Error('Failed to update Video: ' + error.message);
    }
  }

  // Delete a Video by ID
  static async deleteVideo(id) {
    try {
      const result = await Video.destroy({ where: { video_id: id } });
      return result > 0;
    } catch (error) {
      throw new Error('Failed to delete Video: ' + error.message);
    }
  }
}

module.exports = VideoService;
