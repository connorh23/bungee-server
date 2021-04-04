const Sequelize = require('sequelize');

class BungeeModel extends Sequelize.Model {

   static init = ({ sequelize, modelName, spec, timestamps=true, hooks }) => {
   	super.init(spec, {
   		sequelize,
   		modelName,
   		timestamps,
   		... hooks && { hooks  }
   	});
   };

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
