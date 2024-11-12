'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('linked_accounts', [
      {
        user_id: 1,
        platform: 'TikTok',
        platform_user_id: 'tiktok_user_id_123',
        access_token: 'tiktok_access_token_example',
        refresh_token: 'tiktok_refresh_token_example',
        linked_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        platform: 'YouTube',
        platform_user_id: 'youtube_user_id_456',
        access_token: 'youtube_access_token_example',
        refresh_token: 'youtube_refresh_token_example',
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
