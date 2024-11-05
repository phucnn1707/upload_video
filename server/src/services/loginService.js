const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Function to check if an email exists in the database
const checkEmailExists = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  return user; // Returns the user if found, otherwise null
};

// Function to check if the provided password matches the stored hashed password
const checkPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const login = async (email, password) => {
  try {
    // Find the user by email
    const user = await checkEmailExists(email);

    // If user does not exist or password is invalid, return a generic error
    if (!user || !checkPassword(password, user.password_hash)) {
      return { success: false, message: 'Email or password is incorrect' };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // If login is successful, return a success response
    return {
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};

module.exports = { login };
