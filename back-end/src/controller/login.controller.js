const loginService = require('../service/login.service');

const login = async (req, res) => {
  const { body } = req;
  
  const userLoged = await loginService.login(body);
  return res.status(200).json(userLoged);
};

module.exports = {
  login,
};