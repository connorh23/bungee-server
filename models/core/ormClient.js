require('dotenv').config();
let Sequelize = require('sequelize');

let orm_client;

const getClient = async () => {
   if (!orm_client) {
      await initClient();
   }
   return orm_client;
};

const tearDown = () => {
   if (orm_client) orm_client.close();
};

const initClient = async () => {
   orm_client = new Sequelize(process.env.BUNGEE_DEFAULT_DB, process.env.BUNGEE_DB_USER, process.env.BUNGEE_DB_PASSWORD, {
      host: process.env.BUNGEE_DB_HOST,
      dialect: 'mysql',
      logging: true
   });
};

module.exports = {
   getClient,
   tearDown
};
