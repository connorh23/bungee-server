'use strict';

const {
	AppModels,
	ModelManager
} = require('../models');

const {
	query,
	retrieve,
	create,
	update,
	destroy
} = require('../api/rest');

const {
	http: { responses },
	util: { async_executor }
} = require('bungee-lib');

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
		models: Object.keys(ModelManager.models)
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
	case 'GET':
		rest_method = (request.pathParameters.id) ? retrieve : query;
		break;
	case 'POST':
		rest_method = create;
		break;
	case 'PUT':
		rest_method = update;
		break;
	case 'DELETE':
		rest_method = destroy;
		break;
	default:
		rest_method = () => {
			throw `Unsupported http method: ${request.httpMethod}`;
		};
	}

	console.log(request);

	const response = await async_executor.execute({
		method: async () => { return rest_method(request); },
		max_attempts: 1
	});

	console.log(response);

	await ModelManager.teardown();

	const s = responses.success({
		statusCode: response.data? 200 : 500,
		body: {
			...response,
		}
	});

	console.log(s);
	return s;

};
