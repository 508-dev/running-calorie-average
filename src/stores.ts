import { writable, get } from 'svelte/store';

export type CalorieDateMap = {
	[key: string]: number | null;
};

function createCalorieDateMap() {
	const store = writable({} as CalorieDateMap);
	const { subscribe, set } = store;

	const stored = localStorage.calorieMap ?? '{}';
	try {
		set(JSON.parse(stored));
	} catch {
		set({});
	}

	return {
		subscribe,
		set: (val: CalorieDateMap) => {
			localStorage.calorieMap = JSON.stringify(val);
			set(val);
		},
		update: (cb: (arg0: CalorieDateMap) => CalorieDateMap) => {
			const newStore = cb(get(store));
			localStorage.calorieMap = JSON.stringify(newStore);
			set(newStore);
		},
		reset: () => {
			localStorage.calorieMap = JSON.stringify({});
			set({});
		}
	};
}

export const calorieDateMap = createCalorieDateMap();
