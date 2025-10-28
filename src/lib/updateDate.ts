import { goto } from '$app/navigation';
import {
	getNextDay,
	getNextMonth,
	getPreviousDay,
	getPreviousMonth,
	getYesterday,
	getToday
} from './dateHelpers';

export type UpdateType =
	| 'nextDay'
	| 'nextMonth'
	| 'previousDay'
	| 'previousMonth'
	| 'yesterday'
	| 'today';

export const dateUpdateMap: Record<UpdateType, (dateString: string) => string> = {
	nextDay: getNextDay,
	nextMonth: getNextMonth,
	previousDay: getPreviousDay,
	previousMonth: getPreviousMonth,
	yesterday: getYesterday,
	today: getToday
};

export function updateDateQuery(date: string, updateType?: UpdateType) {
	const query = new URLSearchParams();
	console.log('updateDateQuery called with date:', date, 'and updateType:', updateType);

	if (updateType) {
		const updateFunction = dateUpdateMap[updateType];
		query.set('date', updateFunction(date));
	} else {
		query.set('date', date);
	}

	goto(`?${query.toString()}`);
}
