'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("countries", [
            {
                country_name: "India",
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("countries", null, {});
	}
};
