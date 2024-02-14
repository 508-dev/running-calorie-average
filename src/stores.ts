import { writable, derived } from 'svelte/store';

export type CalorieDateMap = {
	[key: string]: number | null;
};

export const calorieDateMap = writable({
	// [new Date().toDateString()]: 0,
});
