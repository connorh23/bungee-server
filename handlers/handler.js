'use strict';

const model_manager = require('../models/model_manager');
const { responses } = require('bungee-lib/http');

const {
   query,
   retrieve,
   create,
   update,
   destroy
} = require('../api/rest');


module.exports.meta_data = async request => {

   const meta = {
      models: Object.keys(model_manager.models)
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

   await model_manager.init();

   let response;

   switch (request.httpMethod) {
      case "GET":
         response = (request.pathParameters.id) ?
            await retrieve(request) :
            await query(request);
         break;
      case "POST":
         response = await create(request);
         break;
      case "PUT":
         response = await update(request);
         break;
      case "DELETE":
         response = await destroy(request);
         break;
      default:
        response = responses.error({
           errors: [`Unsupported http method: ${request.httpMethod}`]
        });
   }

   await model_manager.teardown();

   return responses.success({
      statusCode: response.data? 200 : 500,
      body: {
         ...response,
         event: request,
      }
   });

};
