'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('communities', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			community_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			crop_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			heading: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
			sub_heading: {
				type: Sequelize.STRING(191),
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

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('communities')
};