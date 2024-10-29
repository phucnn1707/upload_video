'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password_hash: passwordHash,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  },
};
