const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const errorThrower = require('../utils/errorThrower');
const { generateToken } = require('../utils/JWT');

const register = async ({ name, email, password, role = 'customer' }, user) => {
  // New validation
  if (user && user.role !== 'administrator') errorThrower(401, 'You shall not pass!');

  const encodedPassword = md5(password);
  const isAlreadyUserExist = await User.findOne({ where: {
    [Op.or]: [
      { email },
      { name },
    ],
  } });

  // New validation
  if (isAlreadyUserExist) errorThrower(409, 'User already registered');
  
  const { dataValues: newUser } = await User.create({
    name,
    email,
    password: encodedPassword,
    role,
  });

  const token = generateToken(newUser); 

  return { name: newUser.name, email: newUser.email, role: newUser.role, token };
};

module.exports = {
  register,
};