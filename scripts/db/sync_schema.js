const { ModelManager } = require('../../models');

const execute = async () => {
	await ModelManager.init();
	await ModelManager.sync();
	await ModelManager.teardown();
	console.log('Done');
};

execute();

