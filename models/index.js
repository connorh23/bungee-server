const ModelManager = require('./model_manager');
const AppModels = require('./app');

module.exports = {
	AppModels,
	ModelManager
};

ModelManager.init().catch(err => {
	console.error("ERROR CONNECTING TO DB", err);
});
