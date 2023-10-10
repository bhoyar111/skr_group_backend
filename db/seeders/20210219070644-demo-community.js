'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("communities", [
            {
                community_name: "Anay Kumar",
                crop_id: 1,
                heading: "The Supreme Court",
                sub_heading: "The Supreme Court in Britain is not an appellate court",
                description: "An appeal could still be made to the European Court of Human Rights if Nirav Modi were to lose his appeal in the high court",
                doc_url: "appleimage.png",
                created_by: 1,
                updated_by: 1,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("communities", null, {});
	}
};
