<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { calorieDateMap } from '../stores.ts';
	import { calcNDay } from '../lib/averages.ts';

	const notEnoughData = 'Not enough data';

	let resetConfirm = 3;

	$: if (resetConfirm === 0) {
		calorieDateMap.reset();
	}

	function updateDateQuery(date: string) {
		const query = new URLSearchParams();
		query.set('date', date);
		goto(`?${query.toString()}`);
	}

	let pathname = '';

	page.subscribe(($page) => (pathname = $page.url.searchParams.get('date')));

	// If the date query param is somehow invalid, try to set it to today
	if (!pathname || typeof pathname !== 'string' || isNaN(new Date(pathname).valueOf())) {
		updateDateQuery(new Date().toDateString());
	}

	// If there's no calorie set for today, set calories to null
	// We can't set to 0, because people might purposefully set to 0 to fast
	// So we need to identify which days to "skip" when calculating averages,
	// because they forgot to record calories that day,
	// and which days were legitimately 0 calories consumed, but tracked
	$: if ($calorieDateMap[pathname] === undefined) {
		calorieDateMap.update((map) => {
			return { ...map, [pathname]: null };
		});
	}

	function handleDateBack() {
		const newDate = new Date(pathname);
		newDate.setDate(newDate.getDate() - 1);
		updateDateQuery(newDate.toDateString());
	}

	function handleDateForward() {
		const newDate = new Date(pathname);
		newDate.setDate(newDate.getDate() + 1);
		updateDateQuery(newDate.toDateString());
	}
</script>

<svelte:head>
	<title>Rolling Calorie Averages</title>
	<meta
		name="description"
		content="Get rolling averages of your calorie intake for the last 3 days, week, or month."
	/>
</svelte:head>

<nav>
	<button on:click={handleDateBack}>
		{'<'}
	</button>
	<h2>
		{pathname}
	</h2>
	<button on:click={handleDateForward}>
		{'>'}
	</button>
</nav>

<section class="todays-calories">
	<label for="calories">Calories</label>
	<input id="calories" type="number" bind:value={$calorieDateMap[pathname]} />
</section>
<section class="calorie-averages">
	<table>
		<tr>
			<th> Running Avg. Length </th>
			<th> Daily Calorie Average </th>
		</tr>
		<tr>
			<td> 3 days </td>
			<td>
				{calcNDay(pathname, 3, $calorieDateMap) || notEnoughData}
			</td>
		</tr>
		<tr>
			<td> 5 days </td>
			<td>
				{calcNDay(pathname, 5, $calorieDateMap) || notEnoughData}
			</td>
		</tr>
		<tr>
			<td> 2 weeks </td>
			<td>
				{calcNDay(pathname, 14, $calorieDateMap) || notEnoughData}
			</td>
		</tr>
		<tr>
			<td> 1 month </td>
			<td>
				{calcNDay(pathname, 30, $calorieDateMap) || notEnoughData}
			</td>
		</tr>
	</table>
</section>
<section>
	<button on:click={() => resetConfirm--}>
		Click {resetConfirm} times to permanently reset all calorie recordings
	</button>
</section>

<style>
	nav {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	label {
		filter: brightness(0.75);
		margin-bottom: 5px;
	}

	.todays-calories {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.calorie-averages {
		display: flex;
		justify-content: center;
	}

	table {
		width: 100%;
	}

	th,
	td {
		border-bottom: 1px solid var(--color-theme-3);
		text-align: center;
	}

	input {
		border: 1px solid var(--font-color);
		background-color: var(--color-bg-1);
		width: 50%;
	}
	input:focus-visible {
		border: 1px solid var(--color-bg-1);
	}
</style>
