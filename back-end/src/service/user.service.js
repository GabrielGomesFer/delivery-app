const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const errorThrower = require('../utils/errorThrower');
const { generateToken } = require('../utils/JWT');

const validateRegister = (user, role) => {
  if (user && user.role !== 'administrator') errorThrower(401, 'You shall not pass!');
  if (!user && role !== 'customer') errorThrower(401, 'You shall not pass!');
};

const register = async ({ name, email, password, role = 'customer' }, user) => {
  validateRegister(user, role);
  
  const encodedPassword = md5(password);
  const isAlreadyUserExist = await User.findOne({ where: {
    [Op.or]: [
      { email },
      { name },
    ],
  } });

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

const getUserByRole = async (queryRole) => {
  const users = await User.findAll({
    where: { role: queryRole },
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const getAllUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const deleteUser = async (id) => {
  const user = await User.findOne({ where: { id } });

  if (!user) errorThrower(404, 'User not found');
  
  await User.destroy({ where: { id } });
};

module.exports = {
  register,
  getUserByRole,
  getUserByEmail,
  getAllUsers,
  deleteUser,
};