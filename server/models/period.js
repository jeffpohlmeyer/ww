const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const periodSchema = new Schema({
	timePeriod: {
		type: String,
		required: true
	},
	foods: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Food'
		}
	],
	recipes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Recipe'
		}
	]
});

module.exports = mongoose.model('Period', periodSchema);
