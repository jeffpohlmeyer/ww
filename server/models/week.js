const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weekSchema = new Schema({
	weight: {
		type: Number,
		required: true
	},
	points: {
		type: Number,
		required: true
	},
	flexPoints: {
		type: Number,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	days: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Day'
		}
	]
});

module.exports = mongoose.model('Week', weekSchema);
