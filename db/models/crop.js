'use strict';
export default (sequelize, DataTypes) => {
	const Crop = sequelize.define('Crop', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        crop_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        crop_img: {
            type: DataTypes.STRING(666),
            allowNull: true,
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
        tableName: 'crops',
    });

    Crop.associate = function(models) {
        // associations can be defined here
    };

    // queries and other function starts
	Crop.getDS = async () => { 
		try {
			return await Crop.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'crop_name']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile App
	Crop.getAllList = async () => {
		try {
			return await Crop.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'crop_name', 'crop_img' ]
			});
		} catch (e) {
			return [];
		}
	};

	Crop.getList = async (curPage, pgSize) => {
		try {
			return await Crop.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['crop_name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'crop_name', 'crop_img']
			});
		} catch (e) {
			return [];
		}
	};

	Crop.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Crop.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Crop.getRecordById = async (id) => {
		try {
			const searchRecord = await Crop.findByPk(id, {
				attributes: ['id', 'crop_name', 'crop_img', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Crop.updateRecord = async (record, reqData) => {
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

	Crop.deleteRecord = async (record) => {
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

    return Crop;
};