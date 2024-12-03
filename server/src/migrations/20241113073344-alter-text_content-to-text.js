'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('text_scripts', 'text_content', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('text_scripts', 'text_content', {
      type: Sequelize.STRING(120),
      allowNull: false,
    });
  },
};
