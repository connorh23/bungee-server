'use strict';

const {
   AppModels,
   ModelManager
} = require('../models');
const { responses } = require('bungee-lib/http');

const {
   query,
   retrieve,
   create,
   update,
   destroy
} = require('../api/rest');

const { telemetry } = require('bungee-lib/util');
module.exports.hello = async request => {

   return responses.success({
      statusCode: 200,
      body: {
         message: 'hello bungee!',
         request
      }
   });

};

module.exports.meta_data = async request => {

   const meta = {
      models: Object.keys(AppModels)
   };

   return responses.success({
      statusCode: 200,
      body: {
         meta,
         request,
      }
   });
};

module.exports.rest = async request => {

   await ModelManager.init();

   let rest_method;

   switch (request.httpMethod) {
      case "GET":
         rest_method = (request.pathParameters.id) ? retrieve : query;
         break;
      case "POST":
         rest_method = create;
         break;
      case "PUT":
         rest_method = update;
         break;
      case "DELETE":
         rest_method = destroy;
         break;
      default:
        rest_method = () => {
           throw `Unsupported http method: ${request.httpMethod}`
        };
   }

   const response = await telemetry.execute(async () => {
      return rest_method(request);
   });

   await ModelManager.teardown();

   return responses.success({
      statusCode: response.data? 200 : 500,
      body: {
         ...response,
      }
   });

};
