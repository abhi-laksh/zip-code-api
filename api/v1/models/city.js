'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.State, {
                foreignKey: 'state_id',
                as: 'state',
                onDelete: "CASCADE",
            })

            this.belongsTo(models.Country, {
                foreignKey: 'country_id',
                as: 'country',
                onDelete: "CASCADE",
            })

        }
    };
    City.init({
        name: DataTypes.STRING,
        postal_code: {
            allowNull: true,
            type: DataTypes.STRING
        },
        country_id: {
            type: DataTypes.INTEGER,

            references: {
                model: 'Country',
                key: 'id',
            },
        },
        state_id: {
            type: DataTypes.BIGINT,

            references: {
                model: 'State',
                key: 'id',
            },
        },
        latitude: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        district: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        longitude: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'City',
        tableName: 'cities',
        updatedAt: true,
    });
    return City;
};