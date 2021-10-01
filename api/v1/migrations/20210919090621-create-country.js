'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('countries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: Sequelize.STRING,
            iso3: Sequelize.STRING,
            iso2: Sequelize.STRING,
            tld: Sequelize.STRING,
            phone_code: Sequelize.STRING,
            currency: Sequelize.STRING,
            numeric_code: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            region: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            subregion: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            currency_symbol: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            flagImg: {
                allowNull: true,
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('countries');
    }
};
