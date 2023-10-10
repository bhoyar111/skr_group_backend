'use strict';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
	const Dealer = sequelize.define('Dealer', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        dealer_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        email_id: {
			type: DataTypes.STRING(191),
			allowNull: true,
			// unique: true
		},
        mobile_no: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        password: {
			type: DataTypes.STRING(191),
			allowNull: true,
		},
        dealer_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        country_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        state_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        district_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        taluka: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
        pin_code: {
            type: DataTypes.STRING(6),
            allowNull: true,
        },
        doc_url: {
            type: DataTypes.STRING(666),
            allowNull: true,
        },
        google_place: {
            type: DataTypes.TEXT,
            allowNull: true,
        }, 
        latitude: {
            type: DataTypes.STRING(100),
            allowNull: true,
		},
		longitude: {
            type: DataTypes.STRING(100),
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
        tableName: 'dealers',
    });

    Dealer.associate = function(models) {
        // associations can be defined here
		Dealer.belongsTo(models.Country, {
            foreignKey: "country_id",
            as: "country",
        });
		Dealer.belongsTo(models.State, {
            foreignKey: "state_id",
            as: "state",
        });
		Dealer.belongsTo(models.City, {
            foreignKey: "district_id",
            as: "city",
        });
    };

    // queries and other function starts

    // For Mobile application
    Dealer.getAllList = async (reqData) => {
		const { Op } = sequelize.Sequelize;
        let dealerCond = { ...reqData, status: true };
        if (reqData.dealer_name) {
            dealerCond.dealer_name = {
                [Op.like]: `%${reqData.dealer_name}%`
            }
        }
        if (reqData.mobile_no) {
            dealerCond.mobile_no = {
                [Op.like]: `%${reqData.mobile_no}%`
            }
        }
		if (reqData.state_id) {
            dealerCond.state_id = reqData.state_id
        }
		if (reqData.district_id) {
            dealerCond.district_id = reqData.district_id
        }
		if (reqData.taluka) {
            dealerCond.taluka = {
                [Op.like]: `%${reqData.taluka}%`
            }
        }
		if (reqData.pin_code) {
            dealerCond.pin_code = {
                [Op.like]: `%${reqData.pin_code}%`
            }
        }
		try {
			const { Country, State, City} = sequelize.models;
            delete dealerCond.pageNo;
			return await Dealer.findAll({
				where: dealerCond,
				include:[
					{ model : Country, as : 'country', attributes: ['country_name']  },
					{ model : State, as : 'state', attributes: ['state_name']  },
					{ model : City, as : 'city', attributes: ['city_name']  },
				],
				attributes: ['id', 'dealer_name', 'email_id', 'mobile_no', 'password', 'dealer_address', 'country_id', 'state_id', 'district_id', 'taluka', 'pin_code', 'doc_url', 'google_place', 'latitude', 'longitude' ]
			});
		} catch (e) {
			return [];
		}
	};

    Dealer.getUser = async (reqData) => { 
		try {
			return await Dealer.findOne({
				where: {
					email_id: reqData.email_id
				},
				attributes: ['id', 'dealer_name', 'email_id', 'mobile_no', 'password', 'dealer_address', 'country_id', 'state_id', 'district_id', 'taluka', 'pin_code', 'doc_url', 'google_place', 'latitude', 'longitude']
			});
		} catch (e) {
			return [];
		}
	};

    Dealer.getDS = async () => {
		try {
			return await Dealer.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'dealer_name']
			});
		} catch (e) {
			return [];
		}
	};

	Dealer.getList = async (curPage, pgSize, reqData) => {
		const { Op } = sequelize.Sequelize;
        let dealerCond = { ...reqData, status: true };
        if (reqData.dealer_name) {
            dealerCond.dealer_name = {
                [Op.like]: `%${reqData.dealer_name}%`
            }
        }
        if (reqData.mobile_no) {
            dealerCond.mobile_no = {
                [Op.like]: `%${reqData.mobile_no}%`
            }
        }
		if (reqData.state_id) {
            dealerCond.state_id = reqData.state_id
        }
		if (reqData.district_id) {
            dealerCond.district_id = reqData.district_id
        }
		if (reqData.taluka) {
            dealerCond.taluka = {
                [Op.like]: `%${reqData.taluka}%`
            }
        }
		if (reqData.pin_code) {
            dealerCond.pin_code = {
                [Op.like]: `%${reqData.pin_code}%`
            }
        }
		try {
			const { Country, State, City} = sequelize.models;
            delete dealerCond.pageNo;
			return await Dealer.findAndCountAll({
				where: dealerCond,
				distinct: true,
                order: [['dealer_name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				include:[
					{ model : Country, as : 'country', attributes: ['country_name']  },
					{ model : State, as : 'state', attributes: ['state_name']  },
					{ model : City, as : 'city', attributes: ['city_name']  },
				],
				attributes: ['id', 'dealer_name', 'email_id', 'mobile_no', 'password', 'dealer_address', 'country_id', 'state_id', 'district_id', 'taluka', 'pin_code', 'doc_url', 'google_place', 'latitude', 'longitude' ]
			});
		} catch (e) {
			return [];
		}
	};

    Dealer.getNearByDealer = async (lat, lon) => {
		try {
            const { QueryTypes  } = sequelize.Sequelize;
            return await sequelize.query(`SELECT *, ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${lon}) ) + sin( radians(${lat}) ) * sin(radians(latitude)) ) ) AS distance  FROM dealers HAVING distance < 50 ORDER BY distance`, { type: QueryTypes.SELECT });
		} catch (e) {
			return false;
		}
	};

	Dealer.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const hashPassword = bcrypt.hashSync(reqData.password, bcrypt.genSaltSync(10), null); 
				const saveObj = {
					...reqData,
					password: hashPassword,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Dealer.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Dealer.getRecordById = async (id) => {
		try {
			const searchRecord = await Dealer.findByPk(id, {
				attributes: ['id', 'dealer_name', 'email_id', 'mobile_no', 'password', 'dealer_address', 'country_id', 'state_id', 'district_id', 'taluka', 'pin_code', 'doc_url', 'google_place', 'latitude', 'longitude', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Dealer.updateRecord = async (record, reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				let hashPassword = record.password;
				if( reqData.password != '' ){
					hashPassword = bcrypt.hashSync(reqData.password, bcrypt.genSaltSync(10), null)
				}
				const updateObj = {
					...reqData,
					password: hashPassword,
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

	Dealer.deleteRecord = async (record) => {
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

    // For Excel Import
    Dealer.saveRecordExcel = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				return await Dealer.bulkCreate(reqData, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

    Dealer.validatePassword = (pass, hashPass) => {
        return bcrypt.compareSync(pass, hashPass);
	}

	Dealer.generateTokens = (userSerialize) => {
		const accessSecret = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : '';
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET :'';
        return {
            access_token  : jwt.sign(userSerialize, accessSecret, { expiresIn: '6h' }),
            refresh_token : jwt.sign(userSerialize, refreshSecret)
        }
	};

    return Dealer;
};