const productService = require('../service/products.service');

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  return res.status(200).json(products);
};

module.exports = {
  getProducts,
};