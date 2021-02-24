const { environment } = require('bungee-lib');

module.exports = {
   db: {
      user: environment.vars.BUNGEE_DB_USER,
      password: environment.vars.BUNGEE_DB_PASSWORD,
      default_db: environment.vars.BUNGEE_DEFAULT_DB,
      host: environment.vars.BUNGEE_DB_HOST
   }
};
