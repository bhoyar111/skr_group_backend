'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("languages", [
            {
                language_name: "English",
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                language_name: "Hindi",
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                language_name: "Marathi",
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("languages", null, {});
	}
};
