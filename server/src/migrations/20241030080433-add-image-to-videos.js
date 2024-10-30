'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('videos', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'video_url',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('videos', 'image');
  },
};
