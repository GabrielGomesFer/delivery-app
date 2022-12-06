const { Product } = require('../database/models');

const verifyProducts = async (req, res, next) => {
  const { productIds } = req.body;

  const modelResult = await Promise.all(productIds
    .map(async ({ productId }) => Product.findByPk(productId)));  
  const products = modelResult.every((productResult) => productResult);

  if (!products) return res.status(404).json({ message: 'Some product not found' });
  next();
};

module.exports = verifyProducts;