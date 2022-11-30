const productModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
    },
    urlImage: {
      type: DataTypes.STRING(200),        
    },
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false,
  });

  return Product;
};

module.exports = productModel;