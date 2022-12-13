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
    attributes: { exclude: ['userId', 'sellerId', 'deliveryAddress', 'deliveryNumber'] },
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

const getAllSales = async ({ role, email }) => {
  if (role === 'seller') {
    const seller = await User.findOne({ where: { email } }); 
    const salesOfSeller = await Sale.findAll({
      where: { sellerId: seller.id },
      attributes: {
        exclude: ['sellerId', 'userId'],
      },
    });
    return salesOfSeller;
  }
  const customer = await User.findOne({ where: { email } }); 
  const allSales = await Sale.findAll({
    where: { userId: customer.id },
    attributes: {
      exclude: ['sellerId', 'userId'],
    },
  });

  return allSales;
};

const updateSaleStatus = async (status, id) => {
  await getSaleById(id);

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