const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const checkEmailExists = async (email) => {
  return await db.User.findOne({ where: { email } });
};

const checkPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const login = async (email, password) => {
  try {
    const user = await checkEmailExists(email);

    if (!user || !checkPassword(password, user.password_hash)) {
      return { success: false, message: 'メールアドレスまたはパスワードが正しくありません' };
    }

    const token = jwt.sign({ user: { id: user.user_id, email: user.email, username: user.username } }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      success: true,
      message: 'ログインに成功しました',
      token: token,
      user: {
        id: user.user_id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'ログイン中にエラーが発生しました' };
  }
};

module.exports = { login };
