'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('keywords', [
      {
        keyword_id: 1,
        platform: 'TikTok',
        keyword: 'DanceChallenge2024',
        trending_date: new Date('2024-10-01'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        keyword_id: 2,
        platform: 'YouTube',
        keyword: 'TechReview2024',
        trending_date: new Date('2024-10-02'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        keyword_id: 3,
        platform: 'Twitter',
        keyword: 'ClimateChangeAction',
        trending_date: new Date('2024-10-03'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        keyword_id: 4,
        platform: 'Google',
        keyword: 'HalloweenCostumes2024',
        trending_date: new Date('2024-10-04'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        keyword_id: 5,
        platform: 'TikTok',
        keyword: 'MakeupTutorial',
        trending_date: new Date('2024-10-05'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('keywords', null, {});
  },
};
