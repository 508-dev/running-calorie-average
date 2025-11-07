import { type CalorieDateMap } from '$/stores.ts';

function getDateDiff(date: string, diff: number) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + diff);
	return newDate.toDateString();
}

function calcNDay(currDate: string, target: number, calorieDateMap: CalorieDateMap) {
	const calorieRecords = [];

	// Start from i=1 to skip today and look at previous days
	for (let i = 1; i <= target; i++) {
		const newDate = getDateDiff(currDate, i * -1);
		const value = calorieDateMap[newDate];

		if (value === null) {
			// null = forgot to record, breaks the average
			return null;
		} else if (value !== undefined) {
			// has data (including 0 for fasting)
			calorieRecords.push(value);
		}
	}

	if (calorieRecords.length < target) {
		return null;
	}

	const sum = calorieRecords.reduce((acc, curr) => acc + curr, 0);
	return Math.round(sum / target);
}

export { calcNDay };
