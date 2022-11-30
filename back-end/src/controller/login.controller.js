const loginService = require('../service/login.service');

const login = async (req, res) => {
  const { body } = req;
  
  const token = await loginService.login(body);
  return res.status(200).json({ token });
}

module.exports = {
  login,
}