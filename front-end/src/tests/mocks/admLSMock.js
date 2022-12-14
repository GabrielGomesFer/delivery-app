const { validToken } = require('./admToken');

const userLS = {
  email: 'adm@deliveryapp.com',
  name: 'Delivery App Admin',
  role: 'administrator',
  token: validToken,
};

module.exports = userLS;
