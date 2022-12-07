const { Sale, User, SaleProduct, Product, sequelize } = require('../database/models');
const errorThrower = require('../utils/errorThrower');
const { getUserByEmail } = require('./user.service');

const saleRegister = async ({
  totalPrice, sellerId, deliveryAddress, deliveryNumber, productIds,
}, { email }) => {
    const { dataValues: { id: userId } } = await getUserByEmail(email);

    const result = await sequelize.transaction(async (t) => {
      const { dataValues: { id } } = await Sale.create({
        userId,
        totalPrice,
        sellerId,
        deliveryAddress,
        deliveryNumber,
        status: 'Pendente',
      },
      { transaction: t });
      const saleProducts = productIds.map((product) => ({ saleId: id, ...product }));

      await SaleProduct.bulkCreate(saleProducts, { transaction: t });
      return id;
    });
    return result;
};

const getSaleById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: User,
        as: 'seller',
        attributes: { exclude: ['password'] },
      },
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] },
      },
    ],
  });

  if (!sale) errorThrower(404, 'Sale not found!');
  return sale;
};

const getAllSales = async () => Sale.findAll({
  attributes: {
    exclude: ['sellerId', 'deliveryAddress', 'deliveryNumber', 'userId'],
  },
});

const updateSaleStatus = async (status, id) => {
  const isSaleExist = await getSaleById(id);
  if (!isSaleExist) errorThrower(404, 'Sale not found!');

  const [isUpdated] = await Sale.update({ status }, { where: { id } });
  if (!isUpdated) errorThrower(400, 'Unsuccessfuly update');

  const updatedStatus = await Sale.findOne({
    where: { id },
    attributes: {
      exclude: [
        'userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate',
      ],
    },
  });
  return updatedStatus;
};

module.exports = {
  saleRegister,
  getSaleById,
  getAllSales,
  updateSaleStatus,
};