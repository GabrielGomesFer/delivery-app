const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'purchase'
    });

    User.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'sale'
    });
  }

  return User
}

module.exports = userModel;