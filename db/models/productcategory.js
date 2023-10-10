'use strict';
export default (sequelize, DataTypes) => {
	const ProductCategory = sequelize.define('ProductCategory', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
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
        tableName: 'product_categories',
    });

    ProductCategory.associate = function(models) {
        // associations can be defined here
    };

    // queries and other function starts
	ProductCategory.getDS = async () => { 
		try {
			return await ProductCategory.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'name']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile App
	ProductCategory.getAllList = async () => {
		try {
			return await ProductCategory.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'name' ]
			});
		} catch (e) {
			return [];
		}
	};

	ProductCategory.getList = async (curPage, pgSize) => {
		try {
			return await ProductCategory.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'name' ]
			});
		} catch (e) {
			return [];
		}
	};

	ProductCategory.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await ProductCategory.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	ProductCategory.getRecordById = async (id) => {
		try {
			const searchRecord = await ProductCategory.findByPk(id, {
				attributes: ['id', 'name', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	ProductCategory.updateRecord = async (record, reqData) => {
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

	ProductCategory.deleteRecord = async (record) => {
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

    return ProductCategory;
};