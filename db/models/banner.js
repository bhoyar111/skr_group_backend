'use strict';
export default (sequelize, DataTypes) => {
	const Banner = sequelize.define('Banner', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        banner_img: {
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
        tableName: 'banners',
    });

    Banner.associate = function(models) {
        // associations can be defined here
    };

    // queries and other function starts
	Banner.getDS = async () => { 
		try {
			return await Banner.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'banner_img']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile App
	Banner.getAllList = async () => {
		try {
			return await Banner.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'banner_img' ]
			});
		} catch (e) {
			return [];
		}
	};

	Banner.getList = async (curPage, pgSize) => {
		try {
			return await Banner.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['id', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'banner_img']
			});
		} catch (e) {
			return [];
		}
	};

	Banner.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Banner.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Banner.getRecordById = async (id) => {
		try {
			const searchRecord = await Banner.findByPk(id, {
				attributes: ['id', 'banner_img', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Banner.updateRecord = async (record, reqData) => {
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

	Banner.deleteRecord = async (record) => {
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

    return Banner;
};