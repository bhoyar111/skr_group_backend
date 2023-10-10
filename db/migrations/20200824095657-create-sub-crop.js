'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sub_crops', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        sub_crop_name: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        crop_id: {
            type: Sequelize.INTEGER(191),
            allowNull: false,
        },
        sub_crop_img: {
            type: Sequelize.STRING(666),
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

  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('sub_crops')
};