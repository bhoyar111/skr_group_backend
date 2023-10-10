'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('farmers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			full_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			age: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
			email_id: {
				type: Sequelize.STRING(191),
				allowNull: true,
				// unique: true
			},
			mobile_no: {
				type: Sequelize.STRING(30),
				allowNull: false
			},
			otp: {
				type: Sequelize.STRING(10),
				allowNull: true
			},
			password: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
			address: {
				type: Sequelize.STRING(666),
				allowNull: true,
			},
			state_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			district_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			taluka: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
			pin_code: {
				type: Sequelize.STRING(6),
				allowNull: true,
			},
			irrigate: {
				type: Sequelize.ENUM,
				values: ['yes', 'no'],
				allowNull: true,
			},
			acreage: {
				type: Sequelize.ENUM,
				values: ['0 to 3', '3 to 6', '6 to 10', '10 to Above'],
				allowNull: true,
			},
			krushi_kendra_name: {
				type: Sequelize.STRING(191),
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

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('farmers')
};