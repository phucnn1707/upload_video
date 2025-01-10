'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'last_fetched_trending_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null,
      after: 'password_hash',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'last_fetched_trending_date');
  },
};
