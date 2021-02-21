const { environment } = require('bungee-lib');

module.exports = {
   db: {
      user: environment.vars.DB_USER,
      password: environment.vars.DB_PASSWORD,
      default_db: environment.vars.DEFAULT_DB,
      host: environment.vars.DB_HOST
   }
};
