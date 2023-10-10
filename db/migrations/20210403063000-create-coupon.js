'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('coupons', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        farmer_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        },
		dealer_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        },
        coupon_no: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        redeem_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
		coupon_status: {
            type: Sequelize.ENUM,
            values: ['Active', 'Expired'],
            allowNull: true,
			defaultValue: 'Active'
        },
        status: {
            type: Sequelize.BOOLEAN(true),
            allowNull: true,
            defaultValue: '1'
        },
        created_by: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
        },
        updated_by: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },

  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('coupons')
};