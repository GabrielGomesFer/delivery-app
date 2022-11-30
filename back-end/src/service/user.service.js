const md5 = require('md5');
const { User } = require('../database/models');
const errorThrower = require('../utils/errorThrower');

const register = async ({ name, email, password, role='customer' }, user) => {
  // Validation of name, email and password;
  // New validation
  if (user && user.role !== 'administrator') errorThrower(401, 'You shall not pass!');

  const encodedPassword = md5(password);
  const isAlredyUserExist = await User.findOne({ where: { email } });

  // New validation
  if (isAlredyUserExist) errorThrower(409, 'User alredy registered');
  
  const { dataValues: newUser } = await User.create({ name, email, password: encodedPassword, role });
  return { name: newUser.name, email: newUser.email, role: newUser.role };
};

module.exports = {
  register,
}