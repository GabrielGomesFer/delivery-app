const md5 = require('md5');
const { User } = require('../database/models');
const { generateToken } = require('../utils/JWT');
const errorThrower = require('../utils/errorThrower');

const login = async ({ email, password }) => {
  const encodedPassword = md5(password);
  const user = await User.findOne({ where: { email, password: encodedPassword } });

  if (!user) errorThrower(404, 'Incorrect email or password');

  const token = generateToken(user);
  const { name, email: emailUser, role } = user;

  return { name, email: emailUser, role, token };
};

module.exports = {
  login,
};
