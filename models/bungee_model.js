const Sequelize = require('sequelize');

class BungeeModel extends Sequelize.Model {
   static init = (sequelize, modelName, spec, timestamps=true, hooks) => {
      super.init(spec, {
         sequelize,
         modelName,
         timestamps,
         ... hooks && { hooks  }
      })
   }
}

module.exports = {
   BungeeModel
};
