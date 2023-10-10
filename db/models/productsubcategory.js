'use strict';
export default (sequelize, DataTypes) => {
	const ProductSubCategory = sequelize.define('ProductSubCategory', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		product_category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
        product_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
		price: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
		weight: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
		description: {
            type: DataTypes.TEXT,
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
        tableName: 'product_subcategories',
    });

    ProductSubCategory.associate = function(models) {
        // associations can be defined here
		ProductSubCategory.belongsTo(models.ProductCategory, {
            foreignKey: "product_category_id",
            as: "productcategory",
        })
    };

    // queries and other function starts
	ProductSubCategory.getDS = async () => { 
		try {
			return await ProductSubCategory.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'product_name']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile App
	ProductSubCategory.getAllLists = async () => {
		try {
			const { ProductCategory } = sequelize.models;
			return await ProductSubCategory.findAll({
				where:{
					status: true,
				},
				include:[
					{ model : ProductCategory, as : 'productcategory', attributes: ['name']  }
				],
				attributes: ['id', 'product_name', 'product_category_id', 'price', 'weight', 'description', 'doc_url' ]
			});
		} catch (e) {
			return [];
		}
	};

	ProductSubCategory.getAllList = async (id) => {
		try {
			const { ProductCategory } = sequelize.models;
			return await ProductSubCategory.findAll({
				where:{
					status: true,
					product_category_id: id
				},
				include:[
					{ model : ProductCategory, as : 'productcategory', attributes: ['name']  }
				],
				attributes: ['id', 'product_name', 'product_category_id', 'price', 'weight', 'description', 'doc_url' ]
			});
		} catch (e) {
			return [];
		}
	};

	ProductSubCategory.getList = async (curPage, pgSize, decId) => {
		try {
			const { ProductCategory } = sequelize.models;
			return await ProductSubCategory.findAndCountAll({
				where:{
					status: true,
					product_category_id: decId
				},
				distinct: true,
                order: [['product_category_id', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				include:[
					{ model : ProductCategory, as : 'productcategory', attributes: ['name']  }
				],
				attributes: ['id', 'product_name', 'product_category_id', 'price', 'weight', 'description', 'doc_url' ]
			});
		} catch (e) {
			return [];
		}
	};

	ProductSubCategory.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await ProductSubCategory.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	ProductSubCategory.getRecordById = async (id) => {
		try {
			const searchRecord = await ProductSubCategory.findByPk(id, {
				attributes: ['id', 'product_name', 'product_category_id', 'price', 'weight', 'description', 'doc_url', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	ProductSubCategory.updateRecord = async (record, reqData) => {
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

	ProductSubCategory.deleteRecord = async (record) => {
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

    return ProductSubCategory;
};