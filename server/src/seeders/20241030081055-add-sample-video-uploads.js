'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('video_uploads', [
      {
        upload_id: 1,
        video_id: 1, // Assume a video with ID 1 exists
        platform: 'TikTok',
        status: 'uploaded',
        attempted_at: new Date('2024-10-01T10:00:00Z'),
        message: 'Upload successful',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        upload_id: 2,
        video_id: 2, // Assume a video with ID 2 exists
        platform: 'YouTube',
        status: 'failed',
        attempted_at: new Date('2024-10-02T12:30:00Z'),
        message: 'Network error during upload',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        upload_id: 3,
        video_id: 3, // Assume a video with ID 3 exists
        platform: 'TikTok',
        status: 'pending',
        attempted_at: new Date(),
        message: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('video_uploads', null, {});
  },
};
