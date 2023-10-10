'use strict';

export default (sequelize, DataTypes) => {
	const StageInformation = sequelize.define('StageInformation', {
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
		stage_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
		name: {
            type: DataTypes.STRING(199),
            allowNull: false,
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
  	}, 
        {
            tableName: 'stage_informations',
        });

    StageInformation.associate = function(models) {
        // associations can be defined here
		StageInformation.belongsTo(models.SubCrop, {
            foreignKey: "sub_crop_id",
            as: "subcrop",
        })

		StageInformation.belongsTo(models.Stage, {
            foreignKey: "stage_id",
            as: "stage",
        })
    };

    // queries and other function starts
	StageInformation.getDS = async () => { 
		try {
			
			return await StageInformation.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'name']
			});
		} catch (e) {
			return [];
		}
	};

	// For mobile app
	StageInformation.getAllList = async (id) => {
		try {
			return await StageInformation.findAll({
				where:{
					status: true,
					stage_id: id
				},
				attributes: ['id', 'name', 'sub_crop_id', 'stage_id', 'description', 'doc_url' ]
			});
		} catch (e) {
			return [];
		}
	};

	StageInformation.getList = async (curPage, pgSize, decId) => {
		try {
			const { Stage, SubCrop } = sequelize.models;
			return await StageInformation.findAndCountAll({
				where:{
					status: true,
					stage_id: decId
				},
				include:[
					{ model : SubCrop, as : 'subcrop', attributes: ['sub_crop_name']  },
					{ model : Stage, as : 'stage', attributes: ['stage_name']  }
				],
				distinct: true,
                order: [['name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'name', 'sub_crop_id', 'stage_id', 'description', 'doc_url' ]
			});
		} catch (e) {
			return [];
		}
	};

	StageInformation.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await StageInformation.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	StageInformation.getRecordById = async (id) => {
		try {
			const searchRecord = await StageInformation.findByPk(id, {
				attributes: ['id', 'name', 'sub_crop_id', 'stage_id', 'description', 'doc_url', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	StageInformation.updateRecord = async (record, reqData) => {
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

	StageInformation.deleteRecord = async (record) => {
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

    return StageInformation;
};