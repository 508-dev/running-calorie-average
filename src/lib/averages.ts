import { type CalorieDateMap } from '../stores';

function getDateDiff(date: string, diff: number) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + diff);
	return newDate.toDateString();
}

function calcNDay(currDate: string, target: number, calorieDateMap: CalorieDateMap) {
	const calorieRecords = [];
	let nullCount = 0;
	const haltPoint = target / 4;
	for (let i = 0; i < target; i++) {
		let newDate = getDateDiff(currDate, i * -1);
		if (calorieDateMap[newDate]) {
			calorieRecords.push(calorieDateMap[newDate]);
		} else {
			nullCount++;
		}
		if (nullCount >= haltPoint) {
			return null;
		}
	}
	const sum = calorieRecords.reduce((sum, next) => {
		if (sum && next) {
			return sum + next;
		} else {
			return sum;
		}
	});

	// Sum could be null?
	return sum ? sum / target : sum;
}

export { calcThreeDay, calcNDay };
