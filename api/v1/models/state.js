'use strict';
const { 
	Model
} = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
	class State extends Model { 
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {

			// define association here
			this.belongsTo(models.Country, {
				foreignKey: 'country_id',
				as:'country',
				onDelete:"CASCADE",
			});

			this.hasMany(models.City, {
				as:'cities',
				foreignKey: 'state_id',
			});
			
		}
	};
	State.init({
		name: DataTypes.STRING,
		latitude: {
			type:DataTypes.STRING,
			allowNull:true,
		},
		longitude:  {
			type:DataTypes.STRING,
			allowNull:true,
		},
		country_id: {
			type: DataTypes.INTEGER,
			
			references: {
				model: 'Country',
				key: 'id',
			},
		}
	}, {
		sequelize,
		modelName: 'State',
		tableName:'states',
		updatedAt: true,
	});
	return State;
};