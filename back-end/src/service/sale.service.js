const { Sale, SaleProduct, sequelize } = require('../database/models');
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

module.exports = {
  saleRegister,
};