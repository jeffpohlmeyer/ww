const User = require('../../models/user');
const Recipe = require('../../models/recipe');

const user = async userId => {
	try {
		const foundUser = await User.findById(userId);
		if (!!foundUser) {
			return {
				...foundUser._doc,
				_id: foundUser._doc.id,
				password: null,
				createdRecipes: recipes.bind(this, foundUser._doc.createdRecipes)
			};
		}
		return null
	} catch(err) {
		throw err;
	}
};

const recipes = async recipeIds => {
	try {
		const foundRecipes = await Recipe.find({_id: {$in: recipeIds}});
		return foundRecipes.map(recipe => (
			{
				...recipe._doc,
				_id: recipe._doc.id,
				creator: user.bind(this, recipe._doc.creator)
			}
		))
	} catch(err) {
		throw err;
	}
};

exports.graphQlUser = user;
exports.graphQlRecipes = recipes;