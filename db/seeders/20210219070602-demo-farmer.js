'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("farmers", [
			{
				full_name	: "Akash Bhoyar",
				email_id	: "akashbhoyar@gmail.com",
				mobile_no	: "8698273854",
				password	: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
				otp      	: "1234",
				age			: "24",
				address		: "Ram Nagar Nandavan, Nagpur",
				state_id	: 1,
				district_id	: 1,
				taluka		: "Nagpur",
				pin_code	: "440009",
				irrigate	: 1,
				acreage 	: 1,
				krushi_kendra_name: "Sai krupa krushi kendra",
				created_by	: 1,
				updated_by	: 1,
				status		: true,
				createdAt	: new Date(),
				updatedAt	: new Date(),
			},
		]);
  	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("farmers", null, {});
	}
};
