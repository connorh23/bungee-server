
const { ModelManager }  = require('../models');
const { query_utils } = require('../util');

const query = async event => {

   const { model } = event.pathParameters;
   const query_params = query_utils.get_model_query_params({ model, event });
   const pagination_params = query_utils.get_pagination_params({ event });
   const order_params = query_utils.get_order_params({ event });

   return ModelManager.get_model(model).findAll({
      where: query_params,
      ... pagination_params,
      order: [order_params],
   });
};

const retrieve = async event => {
   const { id, model } = event.pathParameters;
   return ModelManager.get_model(model).findByPk(id);
};

const create = async event => {
   const { model } = event.pathParameters;
   const { body } = event;
   return ModelManager.get_model(model).create(JSON.parse(body));
};

const update = async event => {
   const { model } = event.pathParameters;
   const { body } = event;
   const item = JSON.parse(body);
   return ModelManager.get_model(model).update(item, { where: { id: item.id } , individualHooks: true });
};

const destroy = async event => {
   const { id, model } = event.pathParameters;
   return ModelManager.get_model(model).destroy({ where: { id: id }, individualHooks: true });
};

module.exports = {
   query,
   retrieve,
   create,
   update,
   destroy
};
