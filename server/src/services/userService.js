const bcrypt = require('bcrypt');
const db = require('../models');

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  try {
    if (!db.User) {
      console.error('User model is not defined');
    } else {
      const hashPass = hashUserPassword(password);

      await db.User.create({
        username: username,
        email: email,
        password: hashPass,
      });

      console.log('User created successfully');
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

module.exports = { createNewUser };
