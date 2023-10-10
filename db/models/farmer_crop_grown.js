'use strict';
export default (sequelize, DataTypes) => {
	const FarmerCropGrown = sequelize.define('FarmerCropGrown', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
		farmer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        sub_crop_id: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'farmer_crop_growns',
    });

    FarmerCropGrown.associate = function(models) {
        // associations can be defined here
		FarmerCropGrown.belongsTo(models.SubCrop, {
            foreignKey: "sub_crop_id",
            as: "subcrop",
        })
    };	

    return FarmerCropGrown;
};