const Day = require('../../../models/day');
const Period = require('../../../models/period');

const createDays = async (args) => {
	const {startDay, points} = {...args};
	const days = [];
	const now = new Date();
	const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	for (let i = 0; i < 7; ++i) {
		const periods = await createPeriods();
		const date = new Date(nowDate);
		date.setDate(date.getDate() + i);
		const dayOfWeek = startDay + i;
		const day = new Day({
			points,
			dayOfWeek,
			date,
			periods: [...periods],
		});
		days.push(day);
	}
	await Promise.all(days.map(e => e.save()));
	return {nowDate, days};
};

const createPeriods = async () => {
	const morning = new Period({timePeriod: 'morning'});
	const afternoon = new Period({timePeriod: 'afternoon'});
	const evening = new Period({timePeriod: 'evening'});
	const anytime = new Period({timePeriod: 'anytime'});
	await Promise.all([morning.save(), afternoon.save(), evening.save(), anytime.save()]);
	return [morning, afternoon, evening, anytime]
};

module.exports = {
	createDays,
	createPeriods,
};