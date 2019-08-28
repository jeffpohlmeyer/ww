const Week = require('../../models/week');
const Day = require('../../models/day');
const Period = require('../../models/period');
const timeUtils = require('./utils/time');

module.exports = {
	createWeek: async (args, req) => {
		// if (!req.isAuth) {
		// 	throw new Error('You are not authorized to create a new week.  Please log in and try again.')
		// }
		const {weight, userId, startDate} = {...args.weekInput};
		const {nowDate, days} = await timeUtils.createDays({startDay: 2, points: 49});
		const week = new Week({
			weight,
			points: 49,
			flexPoints: 49,
			startDate: nowDate,
			days
		});
		return await week.save()
		//todo: get user info (flexPoints) to set up week flexPoints
		//todo: you'll calculate points based on weight
	},
};