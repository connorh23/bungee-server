let Sequelize = require('sequelize');

const environment = require('../environment');

const AppModels = require('./app');


module.exports = class ModelManager {

	static orm_client;
	static models;

	static get_model = (key) => {
		return this.models[key];
	};

	static init = async () => {

		return new Promise((success) => {
			if (!this.models || !this.orm_client) {
				this.models = {};
				this.orm_client = new Sequelize(environment.db.default_db, environment.db.user, environment.db.password, {
					host: environment.db.host,
					dialect: 'mysql',
					logging: true
				});
				for (const [modelName, modelClass] of Object.entries(AppModels)) {
					const pathName = this.__generatePathName(modelName);
					this.models[pathName] = modelClass;
					modelClass.init(this.orm_client);
				}
				success();
			} else {
				success();
			}
		});

		// this.init_foreign_keys();
	};

	/* istanbul ignore next */
	static teardown = async () => {
		await this.orm_client.close();
	};

	static init_foreign_keys = () => {

		// Beer.hasMany(Category, { foreignKey: 'beer_id' });
		// Category.belongsTo(Beer, { foreignKey: 'beer_id' });

	};

	static sync = async () => {
		const models = Object.values(this.models);
		for (const model of models) {
			await model.sync({ alter: true });
		}
	};


	static __generatePathName = modelName => {
		let pathName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
		if (pathName.slice(-1) === "y") {
			pathName = pathName.substring(0, pathName.length - 1);
			pathName += "ies"
		} else {
			pathName += "s"
		}
		return pathName;
	}

};
