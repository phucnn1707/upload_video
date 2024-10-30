'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('text_scripts', [
      {
        script_id: 1,
        user_id: 1, // Assume a user with ID 1 exists
        keyword_id: 1, // Assume a keyword with ID 1 exists
        title: 'Dance Challenge Script',
        text_content: 'This is a sample script for TikTok Dance Challenge 2024.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        script_id: 2,
        user_id: 1, // Assume a user with ID 1 exists
        keyword_id: 2, // Assume a keyword with ID 2 exists
        title: 'Tech Review Script',
        text_content: 'A brief overview for the latest tech review on YouTube.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        script_id: 3,
        user_id: 1, // Assume a user with ID 1 exists
        keyword_id: 3, // Assume a keyword with ID 3 exists
        title: 'Climate Change Action Script',
        text_content: 'Twitter trend about climate change actions and awareness.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('text_scripts', null, {});
  },
};
