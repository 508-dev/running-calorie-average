<script lang="ts">
	import { formatMonthTitle } from '$lib/dateHelpers';

	export let calendarMonth: string;
	export let onMonthNavigation: (direction: 'next' | 'previous') => void;
	export let onMonthPicker: (monthValue: string) => void;

	$: monthAndYear = formatMonthTitle(calendarMonth);
	$: monthInputValue = new Date(calendarMonth).toISOString().slice(0, 7);

	function handleMonthChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			onMonthPicker(input.value);
		}
	}
</script>

<div class="calendar-nav-container">
	<button class="calendar-nav-caret" on:click={() => onMonthNavigation('previous')}> ‹ </button>

	<div class="month-display">
		<p>{monthAndYear}</p>
		<input
			type="month"
			bind:value={monthInputValue}
			on:change={handleMonthChange}
			class="month-input-overlay"
		/>
		<span class="calendar-icon">📅</span>
	</div>

	<button class="calendar-nav-caret" on:click={() => onMonthNavigation('next')}> › </button>
</div>

<style>
	.calendar-nav-container {
		display: grid;
		grid-template-columns: 20px auto 20px;
		justify-content: space-between;
		border: 1px solid var(--color-theme-3);
		padding: 0.5rem;
		width: 190px;
	}

	.calendar-nav-caret {
		cursor: pointer;
		font-size: 1rem;
		font-weight: lighter;
		color: var(--color-theme-3);
		background: none;
		border: none;
	}

	.calendar-nav-caret:hover {
		color: var(--font-color);
		cursor: pointer;
	}

	.month-display {
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.calendar-icon {
		font-size: 0.8rem;
		opacity: 0.7;
		pointer-events: none;
	}

	.month-input-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		/* Hide the native calendar icon */
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	/* Additional hiding for WebKit browsers */
	.month-input-overlay::-webkit-calendar-picker-indicator {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	p {
		margin: 0;
	}
</style>
