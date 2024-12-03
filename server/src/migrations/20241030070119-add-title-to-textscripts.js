'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('text_scripts', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      after: 'keyword_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('text_scripts', 'title');
  },
};
