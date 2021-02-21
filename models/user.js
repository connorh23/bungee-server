
const Sequelize = require('sequelize');
const { BungeeModel } = require('./bungee_model');

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

  static init = (sequelize) => {
    super.init(sequelize, this.MODEL_NAME, this.spec);
  };

};

module.exports = {
  User
}
