const saleService = require('../service/sale.service');

const saleRegister = async (req, res) => {
  const { body, user } = req;

  const saleId = await saleService.saleRegister(body, user);
  return res.status(201).json({ saleId });
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const sale = id ? await saleService.getSaleById(id) : await saleService.getAllSales(user);
  return res.status(200).json(sale);
};

const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedStatus = await saleService.updateSaleStatus(status, id);
  return res.status(200).json(updatedStatus);
};

module.exports = {
  saleRegister,
  getSales,
  updateSaleStatus,
};