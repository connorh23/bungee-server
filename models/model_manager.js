let Sequelize = require('sequelize');

const environment = require('../environment');

const { User } = require('./user');

module.exports = class ModelManager {

  static orm_client = null;

  static models = {
    [User.MODEL_NAME]: User
  };

  static get_model = (key) => {
    return this.models[key];
  };

  static init = async () => {

    return new Promise((success, error) => {
      if (!this.orm_client) {
        this.orm_client = new Sequelize(environment.db.default_db, environment.db.user, environment.db.password, {
          host: environment.db.host,
          dialect: 'mysql',
          logging: true
        });
        Object.values(this.models).forEach(model => {
          model.init(this.orm_client);
        });
        success();
      } else {
        success();
      }
    })

    // this.init_foreign_keys();
  };

  /* istanbul ignore next */
  static teardown = async () => {
    await this.orm_client.close()
  };

  static init_foreign_keys = () => {

    // Beer.hasMany(Category, { foreignKey: 'beer_id' });
    // Category.belongsTo(Beer, { foreignKey: 'beer_id' });

  };

  static sync = async () => {
    await User.sync({ alter: true });
  }

};
