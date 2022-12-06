const userService = require('../service/user.service');

const register = async (req, res) => {
  const { body, user } = req;

  const newUser = await userService.register(body, user);
  return res.status(201).json(newUser);
};

const getUsersByRole = async (req, res) => {
  const { role } = req.query;

  const users = await userService.getUserByRole(role); 
  return res.status(200).json(users);
};

module.exports = {
  register,
  getUsersByRole,
};