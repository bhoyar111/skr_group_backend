'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('akstheexperts', {
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
			subject: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			ask_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			description: {
				type: Sequelize.STRING(666),
				allowNull: true,
			},
			doc_url: {
				type: Sequelize.STRING(666),
				allowNull: true,
			},
			status: {
				type: Sequelize.BOOLEAN(true),
				allowNull: true,
				defaultValue: '1'
			},
			created_by: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			updated_by: {
				type: Sequelize.INTEGER(11),
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

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('akstheexperts')
};