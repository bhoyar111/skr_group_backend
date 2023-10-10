'use strict';

export default (sequelize, DataTypes) => {
	const Stage = sequelize.define('Stage', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		sub_crop_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        stage_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
		doc_url: {
            type: DataTypes.STRING(666),
            allowNull: true,
        },
		have_sub_stage: {
            type: DataTypes.ENUM,
            values: ['yes', 'no'],
            allowNull: true,
        },
		description: {
            type: DataTypes.TEXT,
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
            tableName: 'stages',
        });

    Stage.associate = function(models) {
        // associations can be defined here
		Stage.belongsTo(models.SubCrop, {
            foreignKey: "sub_crop_id",
            as: "subcrop",
        })
    };

    // queries and other function starts
	Stage.getDS = async () => { 
		try {
			
			return await Stage.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'stage_name']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile App
	Stage.getAllList = async (id) => {
		const {  SubCrop } = sequelize.models;
		try {
			return await Stage.findAll({
				where:{
					status: true,
					sub_crop_id: id
				},
				include:[
					{ model : SubCrop, as : 'subcrop', attributes: ['sub_crop_name']  }
				],
				order: [['id', 'ASC']],
				attributes: ['id', 'stage_name', 'sub_crop_id', 'doc_url', 'have_sub_stage', 'description' ]
			});
		} catch (e) {
			return [];
		}
	};

	Stage.getList = async (curPage, pgSize, decId) => {
		try {
			const {  SubCrop } = sequelize.models;
			return await Stage.findAndCountAll({
				where:{
					status: true,
					sub_crop_id: decId,
				},
				include:[
					{ model : SubCrop, as : 'subcrop', attributes: ['sub_crop_name']  }
				],
				distinct: true,
                order: [['id', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'stage_name', 'sub_crop_id', 'doc_url', 'have_sub_stage', 'description' ]
			});
		} catch (e) {
			return [];
		}
	};

	Stage.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Stage.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Stage.getRecordById = async (id) => {
		try {
			const searchRecord = await Stage.findByPk(id, {
				attributes: ['id', 'stage_name', 'sub_crop_id', 'doc_url', 'have_sub_stage', 'description', 'status' ]
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Stage.updateRecord = async (record, reqData) => {
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

	Stage.deleteRecord = async (record) => {
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

    return Stage;
};