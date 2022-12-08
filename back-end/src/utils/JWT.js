const fs = require('fs');
const jwt = require('jsonwebtoken');
const errorThrower = require('./errorThrower');
require('dotenv').config();

const secret = fs.readFileSync('jwt.evaluation.key');
// , { encoding: 'utf-8' }

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
