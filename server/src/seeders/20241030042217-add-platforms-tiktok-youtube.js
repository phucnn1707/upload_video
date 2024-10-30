'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('linked_accounts', [
      {
        user_id: 1, // Assume a user with ID 1 exists
        platform: 'TikTok',
        platform_user_id: 'tiktok_user_id_123', // Replace with actual platform user ID
        access_token: 'tiktok_access_token_example', // Replace with actual access token
        refresh_token: 'tiktok_refresh_token_example', // Replace with actual refresh token
        linked_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1, // Same user or different, based on your needs
        platform: 'YouTube',
        platform_user_id: 'youtube_user_id_456', // Replace with actual platform user ID
        access_token: 'youtube_access_token_example', // Replace with actual access token
        refresh_token: 'youtube_refresh_token_example', // Replace with actual refresh token
        linked_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('linked_accounts', {
      platform: { [Sequelize.Op.in]: ['TikTok', 'YouTube'] },
    });
  },
};
