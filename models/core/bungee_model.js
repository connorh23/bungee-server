const Sequelize = require('sequelize');
const ormClient = require('./ormClient');
class BungeeModel extends Sequelize.Model {

	/**
	 * Initialize the BungeeModel with an ORM connection to the database.
	 * @param sequelize  - <Sequelize>        Initialized Sequelize ORM
	 * @param modelName  - <String>           Model Name used for DB table
	 * @param spec       - <Object>           Model configuration
	 * @param timestamps - <Boolean>          Collect createdAt & updatedAt?
	 * @param hooks      - <Object{key:fn()}> Sequelize model lifecycle hooks
	 */
   static init = async ({ sequelize, modelName, spec, timestamps=true, hooks }) => {
   	super.init(spec, {
   		sequelize: await ormClient.getClient(),
   		modelName,
   		timestamps,
   		... hooks && { hooks  }
   	});
   };

   static linkClient = async () => {
   	await ormClient.getClient();
	};

	static tearDown() {
   	ormClient.tearDown();
	}

	/**
	 * Get the 'url style' model name.  Example 'User' --> 'users'
	 * @param modelName
	 * @returns { string }
	 */
	static getUrlPathString = ({ modelName }) => {
		let pathName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
		if (pathName.slice(-1) === "y") {
			pathName = pathName.substring(0, pathName.length - 1);
			pathName += "ies"
		} else {
			pathName += "s"
		}
		return pathName;
	}
}

module.exports = {
	BungeeModel
};
