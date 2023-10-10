'use strict';
export default (sequelize, DataTypes) => {
	const City = sequelize.define('City', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        city_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        country_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        state_id: {
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
        tableName: 'cities',
    });

    City.associate = function(models) {
        // associations can be defined here
		City.belongsTo(models.Country, {
            foreignKey: "country_id",
            as: "country",
        })
		
		City.belongsTo(models.State, {
            foreignKey: "state_id",
            as: "state",
        })
    };

    // queries and other function starts
	City.getDS = async () => { 
		try {
			return await City.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'country_id', 'state_id', 'city_name']
			});
		} catch (e) {
			return [];
		}
	};

	City.getList = async (curPage, pgSize) => {
		try {
			const { Country, State } = sequelize.models;
			return await City.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['city_name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				include:[
					{ model : Country, as : 'country', attributes: ['country_name']  },
					{ model : State, as : 'state', attributes: ['state_name']  },
				],
				attributes: ['id', 'city_name', 'country_id', 'state_id']
			});
		} catch (e) {
			return [];
		}
	};

	City.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await City.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	City.getRecordById = async (id) => {
		try {
			const searchRecord = await City.findByPk(id, {
				attributes: ['id', 'city_name', 'country_id', 'state_id','status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	City.updateRecord = async (record, reqData) => {
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

	City.deleteRecord = async (record) => {
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

    return City;
};