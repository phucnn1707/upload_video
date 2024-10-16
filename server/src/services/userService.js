import bcrypt from 'bcrypt';
import db from '../models';

// const salt = bcrypt.genSaltSync(10); // Generate a salt with 10 rounds

// const hashUserPassword = (userPassword) => {
//   let hashPassword = bcrypt.hashSync(userPassword, salt);
//   return hashPassword;
// };

const createNewUser = async (email, password, username) => {
  // let hashPass = hashUserPassword(password);
  try {
    if (!db.User) {
      console.error('User model is not defined');
    } else {
      await db.User.create({
        username: username,
        email: email,
        password: password,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { createNewUser };
