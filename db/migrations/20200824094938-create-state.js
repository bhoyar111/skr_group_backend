'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('states', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		state_name: {
			type: Sequelize.STRING(191),
			allowNull: false,
		},
		country_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
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
  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('states')
};