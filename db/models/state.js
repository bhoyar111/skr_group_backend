'use strict';
export default (sequelize, DataTypes) => {
	const State = sequelize.define('State', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		state_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		country_id: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'states',
	});
	State.associate = function(models) {
		// associations can be defined here
		State.belongsTo(models.Country, {
            foreignKey: "country_id",
            as: "country",
        })
	};

	 // queries and other function starts
	 State.getDS = async () => { 
		try {
			return await State.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'country_id', 'state_name']
			});
		} catch (e) {
			return [];
		}
	};

	State.getList = async (curPage, pgSize) => {
		try {
			const { Country } = sequelize.models;
			return await State.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['state_name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				include:[
					{ model : Country, as : 'country', attributes: ['country_name']  }
				],
				attributes: ['id', 'state_name', 'country_id']
			});
		} catch (e) {
			return [];
		}
	};

	State.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await State.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	State.getRecordById = async (id) => {
		try {
			const searchRecord = await State.findByPk(id, {
				attributes: ['id', 'state_name', 'country_id', 'status' ]
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	State.updateRecord = async (record, reqData) => {
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

	State.deleteRecord = async (record) => {
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

	return State;
};