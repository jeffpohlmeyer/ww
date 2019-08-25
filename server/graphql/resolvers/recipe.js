const User = require('../../models/user');
const Recipe = require('../../models/recipe');

const { graphQlUser } = require('./utils/utils');

module.exports = {
	recipes: async () => {
		try {
			const foundRecipes = await Recipe.find();
			return foundRecipes.map(recipe => (
				{
					...recipe._doc,
					_id: recipe.id,
					creator: graphQlUser.bind(this, recipe._doc.creator)
				}
			));
		} catch(err) {
			throw err;
		}
	},
	createRecipe: async (args, req) => {
		if (!req.isAuth) {
			throw new Error('You are not authorized to create a recipe.  Please log in and try again.')
		}
		const recipe = new Recipe({
			name: args.recipeInput.name,
			fat: +args.recipeInput.fat,
			carbs: +args.recipeInput.carbs,
			fiber: +args.recipeInput.fiber,
			protein: +args.recipeInput.protein,
			points: +args.recipeInput.points,
			quantity: +args.recipeInput.quantity,
			link: args.recipeInput.link,
			notes: args.recipeInput.notes,
			foods: args.recipeInput.foods,
			creator: req.userId,
		});
		try {
			const foundUser = await User.findById(req.userId);
			if (!foundUser) {
				throw new Error('No user found.  Recipe not created.')
			}
			foundUser.createdRecipes.push(recipe);
			await foundUser.save();
			return await recipe.save();
		} catch(err) {
			throw err;
		}
	},
};