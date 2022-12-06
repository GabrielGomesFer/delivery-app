const saleService = require('../service/sale.service');

const saleRegister = async (req, res) => {
  const { body, user } = req;

  const saleId = await saleService.saleRegister(body, user);
  return res.status(201).json({ saleId });
};

module.exports = {
  saleRegister,
};