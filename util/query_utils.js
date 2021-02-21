const model_manager = require('../models/model_manager');

const get_order_params = ({ event }) => {

   let {
      order_by,
      order_direction
   } = event.queryStringParameters;

   order_by = order_by ? order_by : 'id';
   order_direction = order_direction ? order_direction : 'asc';

   return [order_by, order_direction];
};

const get_pagination_params = ({ event }) => {

   const {
      page,
      page_size
   } = event.queryStringParameters;

   if (page && parseInt(page) && page_size && parseInt(page_size)) {
      return {
         limit: parseInt(page_size),
         offset: (page - 1) * page_size
      }
   }
};

const get_model_query_params = ({ model, event }) => {

   const model_keys = Object.keys(model_manager.get_model(model).spec);
   const model_query = {};
   Object.entries(event.queryStringParameters).forEach(entry => {
      const key = entry[0];
      const value = entry[1];
      if (model_keys.includes(key)) {
         model_query[key] = value;
      }
   });
   return model_query;
};

module.exports = {
   get_order_params,
   get_pagination_params,
   get_model_query_params
};
