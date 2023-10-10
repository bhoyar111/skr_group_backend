'use strict';
export default (sequelize, DataTypes) => {
	const dealerRefreshToken = sequelize.define('dealerRefreshToken', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email_id: {
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
		tableName: 'dealer_refresh_tokens'
	});

	dealerRefreshToken.associate = function(models) {
		// associations can be defined here
	};

	// queries and other functions
	dealerRefreshToken.saveUserAndTokenData = async (userData, tokenData) => {
		try {
            return await dealerRefreshToken.create({
                email_id: userData.email_id,
                refresh_token: tokenData.refresh_token
            });
        } catch (e) {
            return false;
        }
	}

	dealerRefreshToken.removeUserToken = async (reqData) => {
		try {
			const {refresh_token, dealer_refresh_token_id} = reqData;
            return await dealerRefreshToken.destroy({
                where: {
                    id : dealer_refresh_token_id,
                    refresh_token: refresh_token
                }
            });
        } catch (e) {
            return false;
        }
	}

	return dealerRefreshToken;
};