require('dotenv').config();
let Sequelize = require('sequelize');

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
				this.orm_client = new Sequelize(process.env.BUNGEE_DEFAULT_DB, process.env.BUNGEE_DB_USER, process.env.BUNGEE_DB_PASSWORD, {
					host: process.env.BUNGEE_DB_HOST,
					dialect: 'mysql',
					logging: true
				});
				for (const [modelName, modelClass] of Object.entries(AppModels)) {
					this.models[modelClass.getUrlPathString({ modelName })] = modelClass;
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
};


