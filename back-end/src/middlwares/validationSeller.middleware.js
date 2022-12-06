const { User } = require('../database/models');

const verifySeller = async (req, res, next) => {
  const { sellerId } = req.body;

  const seller = await User.findByPk(sellerId);

  if (!seller) res.status(404).json({ message: 'Seller not found!' });
  next();
};

module.exports = verifySeller;