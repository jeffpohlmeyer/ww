const Food = require('../../models/food');

module.exports = {
	foods: async () => {
		try {
			return await Food.find();
		} catch(err) {
			throw err;
		}
	},
	createFood: async args => {
		try {
			const food = new Food({
				name: args.foodInput.name,
				fat: +args.foodInput.fat,
				carbs: +args.foodInput.carbs,
				fiber: +args.foodInput.fiber,
				protein: +args.foodInput.protein,
				points: +args.foodInput.points,
				quantity: +args.foodInput.quantity,
				link: args.foodInput.link,
				notes: args.foodInput.notes
			});
			return await food.save();
		} catch(err) {
			throw err;
		}
	},
};