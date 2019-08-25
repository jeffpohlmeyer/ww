const Day = require('../../../models/day');
const Period = require('../../../models/period');

const createDays = async (args) => {
	const {morning, afternoon, evening, anytime} = await createPeriods();

};

const createPeriods = async () => {
	const morning = new Period({timePeriod: 'morning'});
	const afternoon = new Period({timePeriod: 'afternoon'});
	const evening = new Period({timePeriod: 'evening'});
	const anytime = new Period({timePeriod: 'anytime'});
	await Promise.all([morning.save(), afternoon.save(), evening.save(), anytime.save()]);
	return {morning, afternoon, evening, anytime}
};
