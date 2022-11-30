const userService = require('../service/user.service');

const register = async (req, res) => {
  const { body, user } = req;

  const newUser = await userService.register(body, user);
  return res.status(201).json(newUser);
}

module.exports = {
  register,
};