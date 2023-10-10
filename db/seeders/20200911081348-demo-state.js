'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("states", [
            {
                state_name: "Maharashtra",
                country_id: 1,
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                state_name: "Madhya Pradesh",
                country_id: 1,
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("states", null, {});
    }
};
