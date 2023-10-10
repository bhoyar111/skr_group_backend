'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('stages', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        sub_crop_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        },
        stage_name: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        doc_url: {
            type: Sequelize.STRING(666),
            allowNull: true,
        },
        have_sub_stage: {
            type: Sequelize.ENUM,
            values: ['yes', 'no'],
            allowNull: true,
        },
		description: {
            type: Sequelize.TEXT,
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

  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('stages')
};