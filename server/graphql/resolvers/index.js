const authResolver = require('./auth');
const recipeResolver = require('./recipe');
const foodResolver = require('./food');

const rootResolver = {
	...authResolver,
	...recipeResolver,
	...foodResolver
};

module.exports = rootResolver;