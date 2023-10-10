'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("cities", [
            {
                city_name: "Nagpur",
                country_id: 1,
                state_id: 1,
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                city_name: "Bhandara",
                country_id: 1,
                state_id: 1,
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                city_name: "Tumsar",
                country_id: 1,
                state_id: 1,
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                city_name:"Wardha",
                country_id: 1,
                state_id: 1,
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("cities", null, {});
    }
};
