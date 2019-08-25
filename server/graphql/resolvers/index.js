const authResolver = require('./auth');
const recipeResolver = require('./recipe');
const foodResolver = require('./food');
const timeResolver = require('./time');

const rootResolver = {
	...authResolver,
	...recipeResolver,
	...foodResolver,
	...timeResolver,
};

module.exports = rootResolver;