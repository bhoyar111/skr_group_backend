'use strict';
export default (sequelize, DataTypes) => {
	const AskTheExpert = sequelize.define('AskTheExpert', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		farmer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
		subject: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		ask_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
		description: {
			type: DataTypes.STRING(666),
			allowNull: true,
		},
		doc_url: {
			type: DataTypes.STRING(666),
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN(true),
			allowNull: true,
			defaultValue: '1'
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		updated_by: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'akstheexperts'
	});

	AskTheExpert.associate = function(models) {
		// associations can be defined here
		AskTheExpert.belongsTo(models.Farmer, {
            foreignKey: "farmer_id",
            as: "farmer",
        });
	};

	 // queries and other function starts
	 AskTheExpert.getDS = async () => { 
		try {
			return await AskTheExpert.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'subject']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile app
	AskTheExpert.getAllList = async () => {
		try {
			const { Farmer } = sequelize.models;
			return await AskTheExpert.findAll({
				where:{
					status: true
				},
				order: [['id', 'ASC']],
				include:[
					{ model : Farmer, as : 'farmer', attributes: ['full_name'] }
				],
				attributes: ['id', 'farmer_id', 'subject', 'ask_date', 'description', 'doc_url']
			});
		} catch (e) {
			return [];
		}
	};

	AskTheExpert.saveMoRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await AskTheExpert.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	AskTheExpert.getList = async (curPage, pgSize) => {
		try {
			const { Farmer } = sequelize.models;
			return await AskTheExpert.findAndCountAll({
				where:{
					status: true
				},
				include:[
					{ model : Farmer, as : 'farmer', attributes: ['full_name']  }
				],
				distinct: true,
                order: [['id', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'farmer_id', 'subject', 'ask_date', 'description', 'doc_url']
			});
		} catch (e) {
			return [];
		}
	};

	AskTheExpert.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await AskTheExpert.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	AskTheExpert.getRecordById = async (id) => {
		try {
			const searchRecord = await AskTheExpert.findByPk(id, {
				attributes: ['id', 'farmer_id', 'subject', 'ask_date', 'description', 'doc_url', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	AskTheExpert.updateRecord = async (record, reqData) => {
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

	AskTheExpert.deleteRecord = async (record) => {
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

	return AskTheExpert;
};