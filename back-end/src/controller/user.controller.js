const userService = require('../service/user.service');

const register = async (req, res) => {
  const { body, user } = req;

  const newUser = await userService.register(body, user);
  return res.status(201).json(newUser);
};

const getUsers = async (req, res) => {
  const { role } = req.query;

  const users = role ? await userService.getUserByRole(role) : await userService.getAllUsers(); 
  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await userService.deleteUser(id);
  return res.status(204).json();
};

module.exports = {
  register,
  getUsers,
  deleteUser,
};