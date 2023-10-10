'use strict';
export default (sequelize, DataTypes) => {
	const SubCrop = sequelize.define('SubCrop', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        sub_crop_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
		crop_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        sub_crop_img: {
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
        tableName: 'sub_crops',
    });

    SubCrop.associate = function(models) {
        // associations can be defined here
		SubCrop.belongsTo(models.Crop, {
            foreignKey: "crop_id",
            as: "crop",
        })
    };

    // queries and other function starts
	SubCrop.getDS = async () => { 
		try {
			
			return await SubCrop.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'sub_crop_name']
			});
		} catch (e) {
			return [];
		}
	};

	SubCrop.getAllListCrop = async () => {
		try {
			return await SubCrop.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'sub_crop_name']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile app
	SubCrop.getAllList = async (id) => {
		try {
			return await SubCrop.findAll({
				where:{
					status: true,
					crop_id: id
				},
				attributes: ['id', 'sub_crop_name', 'crop_id', 'sub_crop_img']
			});
		} catch (e) {
			return [];
		}
	};

	SubCrop.getList = async (curPage, pgSize) => {
		try {
			const { Crop } = sequelize.models;
			return await SubCrop.findAndCountAll({
				where:{
					status: true
				},
				include:[
					{ model : Crop, as : 'crop', attributes: ['crop_name']  }
				],
				distinct: true,
                order: [['crop_id', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,

				attributes: ['id', 'sub_crop_name', 'crop_id', 'sub_crop_img']
			});
		} catch (e) {
			return [];
		}
	};

	SubCrop.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await SubCrop.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	SubCrop.getRecordById = async (id) => {
		try {
			const searchRecord = await SubCrop.findByPk(id, {
				attributes: ['id', 'sub_crop_name', 'crop_id', 'sub_crop_img', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	SubCrop.updateRecord = async (record, reqData) => {
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

	SubCrop.deleteRecord = async (record) => {
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

    return SubCrop;
};