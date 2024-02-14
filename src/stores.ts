import { writable, get } from 'svelte/store';

export type CalorieDateMap = {
	[key: string]: number | null;
};

function createCalorieDateMap() {
	const store = writable({} as CalorieDateMap);
	const { subscribe, set } = store;

	localStorage.calorieMap && set(JSON.parse(localStorage.calorieMap));

	return {
		subscribe,
		set: (val: CalorieDateMap) => {
			localStorage.calorieMap = JSON.stringify(val);
		},
		update: (cb: (arg0: CalorieDateMap) => CalorieDateMap) => {
			const newStore = cb(get(store));
			localStorage.calorieMap = JSON.stringify(newStore);
			set(newStore);
		}
	};
}

export const calorieDateMap = createCalorieDateMap();
