'use strict';
export default (sequelize, DataTypes) => {
	const FarmerRefreshToken = sequelize.define('FarmerRefreshToken', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		mobile_no: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		refresh_token: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		tableName: 'farmer_refresh_tokens'
	});

	FarmerRefreshToken.associate = function(models) {
		// associations can be defined here
	};

	// queries and other functions

	FarmerRefreshToken.checkUserToken = async (cond) => {
		try {
			return await FarmerRefreshToken.findOne({
                where: cond
            });
		} catch (e) {
            return false;
        }
	}

	FarmerRefreshToken.saveFarmerAndTokenData = async (farmerData, tokenData) => {
		try {
            return await FarmerRefreshToken.create({
                mobile_no: farmerData.mobile_no,
                refresh_token: tokenData.refresh_token
            });
        } catch (e) {
            return false;
        }
	}

	FarmerRefreshToken.removeFarmerToken = async (reqData) => {
		try {
			const {refresh_token, farmer_refresh_token_id} = reqData;
            return await FarmerRefreshToken.destroy({
                where: {
                    id : farmer_refresh_token_id,
                    refresh_token: refresh_token
                }
            });
        } catch (e) {
            return false;
        }
	}

	return FarmerRefreshToken;
};