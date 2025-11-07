export function getNextMonth(dateString: string): string {
	const currentDate = new Date(dateString);
	const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
	return nextMonth.toDateString();
}

export function getPreviousMonth(dateString: string): string {
	const currentDate = new Date(dateString);
	const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
	return previousMonth.toDateString();
}

export function getNextDay(dateString: string): string {
	const newDate = new Date(dateString);
	newDate.setDate(newDate.getDate() + 1);
	return newDate.toDateString();
}

export function getPreviousDay(dateString: string): string {
	const newDate = new Date(dateString);
	newDate.setDate(newDate.getDate() - 1);
	return newDate.toDateString();
}

export function getWeekday(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
}

export function getYesterday(): string {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday.toDateString();
}

export function formatMonthTitle(dateString: string) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	});
}

export function getToday(): string {
	return new Date().toDateString();
}

export function formatCurrentDate(dateString: string) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

export function toISODateString(dateStr: string): string {
	const date = new Date(dateStr);
	if (isNaN(date.valueOf())) return '';
	return date.toISOString().slice(0, 10);
}

export function getFirstDayOfMonth(dateString: string): string {
	const date = new Date(dateString);
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	return firstDay.toDateString();
}

export function changeCalendarMonth(
	currentCalendarMonth: string,
	direction: 'next' | 'previous'
): string {
	const date = new Date(currentCalendarMonth);
	const newMonth =
		direction === 'next'
			? new Date(date.getFullYear(), date.getMonth() + 1, 1)
			: new Date(date.getFullYear(), date.getMonth() - 1, 1);
	return newMonth.toDateString();
}

export function getTodayMonthValue(): { monthValue: string } {
	const today = new Date();
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth();
	return {
		monthValue: `${todayYear}-${String(todayMonth + 1).padStart(2, '0')}`
	};
}

export function getYesterdayMonthValue(): { monthValue: string } {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayYear = yesterday.getFullYear();
	const yesterdayMonth = yesterday.getMonth();
	return {
		monthValue: `${yesterdayYear}-${String(yesterdayMonth + 1).padStart(2, '0')}`
	};
}
