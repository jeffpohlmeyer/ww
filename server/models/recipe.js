const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	fat: {
		type: Number,
		required: true
	},
	carbs: {
		type: Number,
		required: true
	},
	fiber: {
		type: Number,
		required: true
	},
	protein: {
		type: Number,
		required: true
	},
	points: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	link: {
		type: String,
		required: false
	},
	notes: {
		type: String,
		required: false
	},
	foods: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Food'
		}
	],
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);
