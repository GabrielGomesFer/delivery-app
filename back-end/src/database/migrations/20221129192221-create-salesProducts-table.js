'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
      sale_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'sales',
          key: 'id',
        },
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id',
        },    
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
   await queryInterface.dropTable('salesProducts');
  }
};
