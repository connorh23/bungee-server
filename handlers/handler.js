'use strict';

const {
	ModelManager
} = require('../models');

/**
 *
 */
const {
	query,
	retrieve,
	create,
	update,
	destroy
} = require('../api/rest');

/**
 *
 */
const {
	http: { responses },
	util: { async_executor }
} = require('bungee-lib');

/**
 *
 * @param request
 * @returns {Promise<*|{headers, statusCode, body }>}
 */
module.exports.hello = async request => {

	return responses.success({
		statusCode: 200,
		body: {
			message: 'hello bungee!',
			request
		}
	});

};

/**
 *
 * @param request
 * @returns {Promise<*|{headers, statusCode, body }>}
 */
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

/**
 *
 * @param request
 * @returns {Promise<*|{headers, statusCode, body }>}
 */
module.exports.rest = async request => {

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

	const response = await async_executor.execute({
		method: async () => { return rest_method({ event: request }); },
		max_attempts: 1
	});

	const s = responses.success({
		statusCode: response.data ? 200 : 500,
		body: {
			...response,
		}
	});

	console.log(s);
	return s;

};
