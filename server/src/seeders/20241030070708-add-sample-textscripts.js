'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('text_scripts', [
      {
        script_id: 1,
        user_id: 1,
        keyword_id: 1,
        title: 'ダンスチャレンジスクリプト',
        text_content: 'これはTikTokのダンスチャレンジ2024用のサンプルスクリプトです。',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        script_id: 2,
        user_id: 1,
        keyword_id: 2,
        title: 'テクノロジーレビュースクリプト',
        text_content: 'YouTubeの最新テクノロジーレビューについての概要です。',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        script_id: 3,
        user_id: 1,
        keyword_id: 3,
        title: '気候変動アクションスクリプト',
        text_content: '気候変動対策と意識向上についてのTwitterトレンドです。',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('text_scripts', null, {});
  },
};
