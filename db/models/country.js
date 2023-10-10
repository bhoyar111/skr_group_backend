'use strict';

export default (sequelize, DataTypes) => {

	const selectAttributes = [ 'id', 'country_name', 'status' ];

	const Country = sequelize.define('Country', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		country_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN(true),
			allowNull: true,
			defaultValue: '1'
		},
		created_by: {
			type: DataTypes.INTEGER(10),
			allowNull: true,
		},
		updated_by: {
			type: DataTypes.INTEGER(10),
			allowNull: true,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
  	}, {
    	tableName: 'countries',
	});

	Country.associate = function(models) {
		// associations can be defined here
	};

	// queries and other function starts
	Country.getDS = async () => { 
		try {
			return await Country.findAll({
				where:{
					status: true
				},
				attributes: [ ...selectAttributes ]
			});
		} catch (e) {
			return [];
		}
	};

	Country.getList = async (curPage, pgSize) => {
		try {
			return await Country.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['country_name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: [ ...selectAttributes]
			});
		} catch (e) {
			return [];
		}
	};

	Country.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Country.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Country.getRecordById = async (id) => {
		try {
			const searchRecord = await Country.findByPk(id, {
				attributes: [ ...selectAttributes ]
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Country.updateRecord = async (record, reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const updateObj = {
					...reqData,
					updatedAt: new Date()
				};
				return await record.update(updateObj, { transaction: t });
			});
			// return result from updated record
			return result;
		} catch (e) {
			return false;
		}
	};

	Country.deleteRecord = async (record) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				return await record.update({
					status: false,
					updatedAt: new Date()
				}, { transaction: t });
			});
			// return result from updated record
			return result;
		} catch (e) {
			return false;
		}
	};

	return Country;
};