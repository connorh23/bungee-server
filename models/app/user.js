const Sequelize = require('sequelize');
const { BungeeModel } = require('../core/bungee_model');
const { ormClient } = require('../core');

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

  static init = async () => {
  	// await this.linkClient();
  	super.init({
  		modelName: this.MODEL_NAME,
  		spec: this.spec,
  		hooks: this.hooks
  	});
  };
}

module.exports = User;
