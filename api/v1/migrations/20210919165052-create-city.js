'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: Sequelize.STRING,
            postal_code: {
                allowNull: true,
                type: Sequelize.STRING
            },
            district: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            country_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'countries',
                    key: 'id',
                },
            },
            state_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'states',
                    key: 'id',
                },
            },
            latitude: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            longitude: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cities');
    }
};
