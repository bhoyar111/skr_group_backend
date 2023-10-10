'use strict';
export default (sequelize, DataTypes) => {
	const Coupon = sequelize.define('Coupon', {
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
		dealer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        coupon_no: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
        redeem_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
		coupon_status: {
            type: DataTypes.ENUM,
            values: ['Active', 'Expired'],
            allowNull: true,
			defaultValue: 'Active'
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
        tableName: 'coupons',
    });

    Coupon.associate = function(models) {
        // associations can be defined here
    };

    // queries and other function starts
	// Coupon.getDS = async () => { 
	// 	try {
	// 		return await Coupon.findAll({
	// 			where:{
	// 				status: true
	// 			},
	// 			attributes: ['id', 'coupon_no']
	// 		});
	// 	} catch (e) {
	// 		return [];
	// 	}
	// };

	Coupon.getAllList = async () => {
		try {
			return await Coupon.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'farmer_id', 'dealer_id', 'coupon_no', 'redeem_date' ]
			});
		} catch (e) {
			return [];
		}
	};

	Coupon.getList = async (curPage, pgSize) => {
		try {
			return await Coupon.findAndCountAll({
				where:{
					status: true
				},
				distinct: true,
                order: [['coupon_no', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'farmer_id', 'dealer_id', 'coupon_no', 'redeem_date']
			});
		} catch (e) {
			return [];
		}
	};

	Coupon.saveRecord = async (reqData) => {
		// try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Coupon.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		// } catch (e) {
		// 	return false;
		// }
	};

	Coupon.getRecordById = async (id) => {
		try {
			const searchRecord = await Coupon.findByPk(id, {
				attributes: ['id', 'farmer_id', 'dealer_id', 'coupon_no', 'redeem_date', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Coupon.updateRecord = async (record, reqData) => {
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

	Coupon.deleteRecord = async (record) => {
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

    return Coupon;
};

// SKR-farmer_id-0000