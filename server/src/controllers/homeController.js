const { createNewUser } = require('../services/userService');

const handleHelloWorld = (req, res) => {
  return;
};

const handleCreateUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  createNewUser(email, password, username);

  return res.send('Sucessfully created');
};

module.exports = { handleHelloWorld, handleCreateUser };
