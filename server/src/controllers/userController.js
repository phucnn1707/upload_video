const { createNewUser, getAllUsers, updateUser, deleteUser } = require('../services/userService');

const handleHelloWorld = (req, res) => {
  return res.send('Hello, world!');
};

const handleCreateUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    await createNewUser(email, password, username);
    return res.status(201).send('Successfully created');
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).send('Error creating user');
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send('Error fetching users');
  }
};

const handleUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { email, username, password } = req.body;

  try {
    await updateUser(id, email, username, password);
    return res.status(200).send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).send('Error updating user');
  }
};

const handleDeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    return res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).send('Error deleting user');
  }
};

module.exports = {
  handleHelloWorld,
  handleCreateUser,
  handleGetAllUsers,
  handleUpdateUser,
  handleDeleteUser,
};
