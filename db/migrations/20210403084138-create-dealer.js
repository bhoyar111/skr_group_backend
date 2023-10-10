'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('dealers', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        dealer_name: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        email_id: {
            type: Sequelize.STRING(191),
            allowNull: true,
            // unique: true
        },
        mobile_no: {
          type: Sequelize.STRING(191),
          allowNull: false,
        },
        password: {
            type: Sequelize.STRING(191),
            allowNull: true,
        },
        dealer_address: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        country_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        },
        state_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        },
        district_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        },
        taluka: {
            type: Sequelize.STRING(191),
            allowNull: true,
        },
        pin_code: {
            type: Sequelize.STRING(6),
            allowNull: true,
        },
        doc_url: {
            type: Sequelize.STRING(666),
            allowNull: true,
        },
        google_place: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        latitude: {
            type: Sequelize.STRING(100),
            allowNull: true,
		},
		longitude: {
            type: Sequelize.STRING(100),
            allowNull: true,
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

  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('dealers')
};