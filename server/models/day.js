const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daySchema = new Schema({
	points: {
		type: Number,
		required: true
	},
	periods: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Period'
		}
	]
});

module.exports = mongoose.model('Day', daySchema);
