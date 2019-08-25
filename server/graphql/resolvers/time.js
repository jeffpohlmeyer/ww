const Week = require('../../models/week');
const Day = require('../../models/day');
const Period = require('../../models/period');

module.exports = {
	createWeek: async (args, req) => {
		if (!req.isAuth) {
			throw new Error('You are not authorized to create a new week.  Please log in and try again.')
		}
		const {weight, userId} = {...args.weekInput};
		//todo: create period
		//todo: create day
		//todo: add periods to days and days to week
		//todo: get user info (flexPoints) to set up week flexPoints
		//todo: you'll calculate points based on weight
	},
};