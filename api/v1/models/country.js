'use strict';
const {
	Model
} = require('sequelize');
 

module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			this.hasMany(models.State, {
				as: 'states',
				foreignKey:'country_id',
			});

			this.hasMany(models.City, {
				as: 'cities',
				foreignKey:'country_id',
			});

		}
	};

	Country.init({
		name: DataTypes.STRING,
		iso3: DataTypes.STRING,
		iso2: DataTypes.STRING,
		tld: DataTypes.STRING,
		phone_code: DataTypes.STRING,
		currency: DataTypes.STRING,
		numeric_code: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		region: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		subregion: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		currency_symbol: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		flagImg: {
			allowNull: true,
			type: DataTypes.TEXT,
		},
		latitude: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		longitude: {
			allowNull: true,
			type: DataTypes.STRING,
		},
	}, {
		sequelize,
		modelName: 'Country',
		tableName: 'countries',
		updatedAt: true,
	});

	return Country;
};
