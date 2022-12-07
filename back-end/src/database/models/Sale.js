const saleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
    },
    saleDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING(50),
    },
  }, {
    tableName: 'sales',
    underscored: true,
    createdAt: 'saleDate',
    updatedAt: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller'
    });
  }

  return Sale
}

module.exports = saleModel;