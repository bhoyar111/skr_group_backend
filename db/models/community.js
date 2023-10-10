'use strict';
export default (sequelize, DataTypes) => {
	const Community = sequelize.define('Community', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		community_name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		crop_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		heading: {
			type: DataTypes.STRING(191),
			allowNull: true,
		},
		sub_heading: {
			type: DataTypes.STRING(191),
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
		tableName: 'communities'
	});

	Community.associate = function(models) {
		// associations can be defined here
		// Community.belongsTo(models.Crop, {
        //     foreignKey: "crop_id",
        //     as: "crop",
        // })
	};

	 // queries and other function starts
	 Community.getDS = async () => { 
		try {
			return await Community.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'community_name']
			});
		} catch (e) {
			return [];
		}
	};

	Community.getList = async () => {
		try {
			// const { Crop } = models;
			return await Community.findAll({
				where:{
					status: true
				},
				// include:[
				// 	{ model : Crop, as : 'crop', attributes: ['crop_name']  }
				// ],
				attributes: ['id', 'community_name', 'crop_id', 'heading', 'sub_heading', 'description', 'doc_url']
			});
		} catch (e) {
			return [];
		}
	};

	Community.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Community.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Community.getRecordById = async (id) => {
		try {
			const searchRecord = await Community.findByPk(id, {
				attributes: ['id', 'community_name', 'crop_id', 'heading', 'sub_heading', 'description', 'doc_url', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Community.updateRecord = async (record, reqData) => {
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

	Community.deleteRecord = async (record) => {
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

	return Community;
};