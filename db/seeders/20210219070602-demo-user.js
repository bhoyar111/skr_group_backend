'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("users", [
			{
				first_name: "Vishal",
				middle_name: "R",
				last_name: "Kothekar",
				email_id: "vishalrkothekar@gmail.com",
				mobile_no: "8109847928",
				password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
				profile_img: null,
				role_id: 1,
				created_by: 1,
				updated_by: 1,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
  	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("users", null, {});
	}
};
