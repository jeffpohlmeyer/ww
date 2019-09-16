const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	},
	startDay: {
		type: Number,
		required: false
	},
	flexPoints: {
		type: Number,
		required: false
	},
	height: {
		type: Number,
		required: false
	},
	birthDate: {
		type: Date,
		required: false
	},
	createdRecipes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Recipe'
		}
	],
	isVerified: {
		type: Boolean,
		default: false
	},
	token: {
		type: String,
		required: false
	},
	tokenExpiration: {
		type: Date,
		required: false
	}
});

module.exports = mongoose.model('User', userSchema);
