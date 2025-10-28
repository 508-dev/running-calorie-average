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
