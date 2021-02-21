const telemetry = require('../util/telemetry');
const model_manager = require('../models/model_manager');

const {
   get_model_query_params,
   get_pagination_params,
   get_order_params
} = require('../util/query_utils');

const query = async event => {

   const { model } = event.pathParameters;

   const query_params = get_model_query_params({ model, event });
   const pagination_params = get_pagination_params({ event });
   const order_params = get_order_params({ event });

   return await telemetry.execute(async () => {
      return model_manager.get_model(model).findAll({
         where: query_params,
         ... pagination_params,
         order: [order_params],
      });
   });
};



const retrieve = async event => {
   const { id, model } = event.pathParameters;
   return await telemetry.execute(async () => {
      return model_manager.get_model(model).findByPk(id);
   });
};

const create = async event => {
   const { model } = event.pathParameters;
   const { body } = event;
   return await telemetry.execute(async () => {
      return await model_manager.get_model(model).create(JSON.parse(body));
   });
};

const update = async event => {
   const { model } = event.pathParameters;
   const { body } = event;
   const item = JSON.parse(body);
   return await telemetry.execute(async () => {
      return await model_manager.get_model(model).update(item, { where: { id: item.id } , individualHooks: true });
   });
};

const destroy = async event => {
   const { id, model } = event.pathParameters;
   return await telemetry.execute(async () => {
      return await model_manager.get_model(model).destroy({ where: { id: id }, individualHooks: true });
   });
};

module.exports = {
   query,
   retrieve,
   create,
   update,
   destroy
};
