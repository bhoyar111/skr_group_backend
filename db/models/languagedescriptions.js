'use strict';
export default (sequelize, DataTypes) => {
	const LanguageDescriptions = sequelize.define('LanguageDescriptions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		language_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		heading: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		heading_des: {
			type: DataTypes.STRING(191),
			allowNull: false,
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
		tableName: 'language_descriptions'
	});

	LanguageDescriptions.associate = function(models) {
		// associations can be defined here
		LanguageDescriptions.belongsTo(models.Language, {
            foreignKey: "language_id",
            as: "language",
        })
	};

	 // queries and other function starts
	 LanguageDescriptions.getDS = async () => { 
		try {
			return await LanguageDescriptions.findAll({
				where:{
					status: true
				},
				attributes: ['id','language_id', 'heading', 'heading_des']
			});
		} catch (e) {
			return [];
		}
	};

	LanguageDescriptions.getList = async (models) => {
		try {
			const { Language } = models;
			return await LanguageDescriptions.findAll({
				where:{
					status: true
				},
				include:[
					{ model : Language, as : 'language', attributes: ['language_name']  }
				],
				attributes: ['id','language_id', 'heading', 'heading_des']
			});
		} catch (e) {
			return [];
		}
	};

	LanguageDescriptions.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await LanguageDescriptions.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	LanguageDescriptions.getRecordById = async (id) => {
		try {
			const searchRecord = await LanguageDescriptions.findByPk(id, {
				attributes: ['id','language_id', 'heading', 'heading_des','status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	LanguageDescriptions.updateRecord = async (record, reqData) => {
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

	LanguageDescriptions.deleteRecord = async (record) => {
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

	return LanguageDescriptions;
};