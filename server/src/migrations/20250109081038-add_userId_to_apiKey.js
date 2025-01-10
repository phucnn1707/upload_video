'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('api_keys', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      after: 'id',
      references: {
        model: 'users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('api_keys', 'user_id');
  },
};
