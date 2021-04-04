const Sequelize = require('sequelize');
const { BungeeModel } = require('../core/bungee_model');

class User extends BungeeModel {

  static MODEL_NAME = 'users';

	static spec = {
  		id: {
  			autoIncrement: true,
  			primaryKey: true,
  			type: Sequelize.INTEGER,
  		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
	};

  static hooks = {

  };

  static init = (sequelize) => {
  	super.init({
  		sequelize,
  		modelName: this.MODEL_NAME,
  		spec: this.spec,
  		hooks: this.hooks
  	});
  };
}

module.exports = User;
