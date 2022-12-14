const { validToken } = require('./sellerToken');

const userLS = {
  email: 'fulana@deliveryapp.com',
  name: 'Fulana Pereira',
  role: 'seller',
  token: validToken,
};

module.exports = userLS;
