const { validToken } = require('./token');

const userLS = {
  email: 'zebirita@email.com',
  name: 'Cliente Zé Birita',
  role: 'customer',
  token: validToken,
};

module.exports = userLS;
