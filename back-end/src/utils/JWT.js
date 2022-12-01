const jwt = require('jsonwebtoken');
// const fs = require('fs');
const errorThrower = require('./errorThrower');
require('dotenv').config();

// const secret = fs.readFile('../../jwt.evaluation.key');
const secret = process.env.JWT_SECRET_KEY;

const generateToken = ({ role, email, name }) => {
  const payload = {
    role, email, name,
  };

  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, secret, config);
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    throw errorThrower(401, 'Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
