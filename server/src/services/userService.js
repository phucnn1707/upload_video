const bcrypt = require('bcrypt');
const db = require('../models');

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const isUserExists = async (email, username) => {
  const userByEmail = await db.User.findOne({ where: { email } });
  if (userByEmail) return { exists: true, field: 'email' };

  const userByUsername = await db.User.findOne({ where: { username } });
  if (userByUsername) return { exists: true, field: 'username' };

  return { exists: false };
};

const createNewUser = async (email, password, username) => {
  try {
    if (!db.User) {
      console.error('User model is not defined');
    } else {
      const hashPass = hashUserPassword(password);

      const { exists, field } = await isUserExists(email, username);
      if (exists) {
        console.log(`The ${field} already exists`);
        return;
      }

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

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'email', 'username', 'createdAt', 'updatedAt'],
    });
    console.log('All Users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const updateUser = async (userId, newEmail, newUsername, newPassword) => {
  try {
    const user = await db.User.findByPk(userId);
    if (user) {
      user.email = newEmail || user.email;
      user.username = newUsername || user.username;
      if (newPassword) {
        user.password = hashUserPassword(newPassword);
      }
      await user.save();
      console.log('User updated successfully');
    } else {
      console.log(`User with id ${userId} not found`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await db.User.findByPk(userId);
    if (user) {
      await user.destroy();
      console.log('User deleted successfully');
    } else {
      console.log(`User with id ${userId} not found`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

module.exports = { createNewUser, getAllUsers, updateUser, deleteUser };
