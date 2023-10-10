'use strict';
export default (sequelize, DataTypes) => {
	const Video = sequelize.define('Video', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		sub_crop_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING(666),
            allowNull: true,
        },
		v_date: {
            type: DataTypes.DATE,
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
        tableName: 'videos',
    });

    Video.associate = function(models) {
        // associations can be defined here
		Video.belongsTo(models.SubCrop, {
            foreignKey: "sub_crop_id",
            as: "subcrop",
        })
    };

    // queries and other function starts
	Video.getDS = async () => { 
		try {
			return await Video.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'title']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile app
	Video.getAllList = async () => { 
		try {
			const { SubCrop } = sequelize.models;
			return await Video.findAll({
				where:{
					status: true
				},
				include:[
					{ model : SubCrop, as : 'subcrop', attributes: ['sub_crop_name']  }
				],
				attributes: ['id', 'title', 'sub_crop_id', 'link', 'v_date']
			});
		} catch (e) {
			return [];
		}
	};

	Video.getList = async (curPage, pgSize) => {
		try {
			const { SubCrop } = sequelize.models;
			return await Video.findAndCountAll({
				where:{
					status: true
				},
				include:[
					{ model : SubCrop, as : 'subcrop', attributes: ['sub_crop_name']  }
				],
				distinct: true,
                order: [['title', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'title', 'sub_crop_id', 'link', 'v_date']
			});
		} catch (e) {
			return [];
		}
	};

	Video.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Video.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Video.getRecordById = async (id) => {
		try {
			const searchRecord = await Video.findByPk(id, {
				attributes: ['id', 'title', 'sub_crop_id', 'link', 'v_date', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Video.updateRecord = async (record, reqData) => {
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

	Video.deleteRecord = async (record) => {
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

    return Video;
};