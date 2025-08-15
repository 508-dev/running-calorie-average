<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { calorieDateMap } from '../stores.ts';
	import { calcNDay } from '../lib/averages.ts';
	import DataTransfers from '$lib/components/dataTransfers.svelte';
	import '../styles/calendar.css';

	const notEnoughData = 'Not enough data';

	let pathname = '';
	let calorieInput: HTMLInputElement;
	let showResetModal = false;
	let resetSuccess = false;
	let dateInputValue = '';
	
	let startX: number;
	let endX: number;

	$: calendarDates = generateCalendarDates(pathname, $calorieDateMap);
	$: currentMonthTitle = formatMonthTitle(pathname);

	$: if ($calorieDateMap[pathname] === undefined) {
		calorieDateMap.update((map) => {
			return { ...map, [pathname]: null };
		});
	}

	page.subscribe(($page) => {
		const date = $page.url.searchParams.get('date');
		pathname = date ?? new Date().toDateString();
	});

	function updateDateQuery(date: string) {
		const query = new URLSearchParams();
		query.set('date', date);
		goto(`?${query.toString()}`);
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

	/**
	 * Handles the date picker input when the label is clicked.
	 * @param event
	 */
	function handleDatePicker(event: MouseEvent) {
		const label = event.target as HTMLLabelElement;
		const input = document.getElementById('date-picker') as HTMLInputElement;
		
		if (input) {
			// Try to use showPicker if available (modern browsers)
			if (input.showPicker && typeof input.showPicker === 'function') {
				try {
					input.showPicker();
				} catch (e) {
					// Fallback: just focus the input
					input.focus();
					input.click();
				}
			} else {
				// Fallback for browsers without showPicker support
				input.focus();
				input.click();
			}
			
			input.onchange = () => {
				if (input.value) {
					const [year, month, day] = input.value.split('-').map(Number);
					const selectedDate = new Date(year, month - 1, day); // month is 0-based
					if (!isNaN(selectedDate.valueOf())) {
						updateDateQuery(selectedDate.toDateString());
					}
				}
			};
		}
	}

	/**
	 * Converts a date string in the format "Wed Aug 07 2024" to "YYYY-MM-DD".
	 * @param dateStr
	 */
	function toISODateString(dateStr: string): string {
		const date = new Date(dateStr);
		if (isNaN(date.valueOf())) return '';
		return date.toISOString().slice(0, 10);
	}

	// Initialize dateInputValue with the current pathname in ISO format
	$: dateInputValue = toISODateString(pathname);

	function generateCalendarDates(currentDateString: string, calorieMap: Record<string, number | null>) {
		const currentDate = new Date(currentDateString);
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		
		const firstDayOfMonth = new Date(year, month, 1);
		const lastDayOfMonth = new Date(year, month + 1, 0);
		const startingDayOfWeek = firstDayOfMonth.getDay();
		
		const dates = [];
		const today = new Date().toDateString();
		
		// Add days from previous month to fill the grid
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			const date = new Date(year, month, -i);
			const dateString = date.toDateString();
			dates.push({
				day: date.getDate(),
				dateString,
				isCurrentMonth: false,
				isToday: dateString === today,
				calories: calorieMap[dateString]
			});
		}
		
		// Add all days of current month
		for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
			const date = new Date(year, month, day);
			const dateString = date.toDateString();
			dates.push({
				day: day,
				dateString,
				isCurrentMonth: true,
				isToday: dateString === today,
				calories: calorieMap[dateString]
			});
		}
		
		// Add days from next month to complete the grid
		const totalCells = Math.ceil(dates.length / 7) * 7;
		for (let day = 1; dates.length < totalCells; day++) {
			const date = new Date(year, month + 1, day);
			const dateString = date.toDateString();
			dates.push({
				day: day,
				dateString,
				isCurrentMonth: false,
				isToday: dateString === today,
				calories: calorieMap[dateString]
			});
		}
		
		return dates;
	}

	async function handleCalendarDateClick(dateString: string) {
		updateDateQuery(dateString);
		await tick();
		setTimeout(() => {
			if (calorieInput) {
				calorieInput.focus();
				calorieInput.select();
			}
		}, 10);
	}

	function handleSwipe() {
		if (startX - endX > 50) {
			handleDateForward();
		} else if (endX - startX > 50) {
			handleDateBack();
		}
	}

	function handleTouchStart(event: TouchEvent) {
		startX = event.touches[0].clientX;
	}

	function handleTouchEnd(event: TouchEvent) {
		endX = event.changedTouches[0].clientX;
		handleSwipe();
	}

	// If the date query param is somehow invalid, try to set it to today
	if (!pathname || typeof pathname !== 'string' || isNaN(new Date(pathname).valueOf())) {
		updateDateQuery(new Date().toDateString());
	}

	function formatMonthTitle(dateString: string) {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric'
		});
	}

	function handleSaveAndNext() {
		handleDateForward()

		setTimeout(() => {
			if (calorieInput) {
				calorieInput.focus()
				calorieInput.select()
			}
		}, 100);
	}

	function closeModal() {
		showResetModal = false;
	}

	function confirmReset() {
		calorieDateMap.reset();
		showResetModal = false;
		resetSuccess = true;

		setTimeout(() => {
			resetSuccess = false;
		}, 3000);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showResetModal) {
			closeModal();
		}
	}

	function formatCurrentDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			month: 'short', 
			day: 'numeric',
			year: 'numeric'
		});
	}

	function getWeekday(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { weekday: 'long' });
	}

	function getYesterday() {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return yesterday.toDateString();
	}
</script>

<svelte:head>
	<title>Rolling Calorie Averages</title>
	<meta
		name="description"
		content="Get rolling averages of your calorie intake for the last 3 days, week, or month."
	/>
</svelte:head>
<svelte:window on:keydown={handleKeydown} />

<nav class="calendar-nav">
	<div class="nav-container">
		<button class="nav-button nav-prev" on:click={handleDateBack} aria-label="Previous day">
			<span class="nav-icon">←</span>
			<span class="nav-label">Previous</span>
		</button>
		
		<div class="current-date-container">
			<h2 
				class="current-date"
				on:touchstart={handleTouchStart} 
				on:touchend={handleTouchEnd}
				title="Swipe to navigate dates"
			>
				<label id="date-picker-label" for="date-picker" on:click={handleDatePicker}>
					<span class="date-main">{formatCurrentDate(pathname)}</span>
					<span class="date-weekday">{getWeekday(pathname)}</span>
				</label>
				<input type="date" id="date-picker" name="date-picker" bind:value={dateInputValue} style="display: none;">
			</h2>
		</div>
		
		<button class="nav-button nav-next" on:click={handleDateForward} aria-label="Next day">
			<span class="nav-label">Next</span>
			<span class="nav-icon">→</span>
		</button>
	</div>
	
	<div class="date-shortcuts">
		<button class="shortcut-button" on:click={() => updateDateQuery(getYesterday())}>
			Yesterday
		</button>
		<button class="shortcut-button" on:click={() => updateDateQuery(new Date().toDateString())}>
			Today
		</button>
	</div>
</nav>


<section class="calendar">
	<h3 class="calendar-month-title">{currentMonthTitle}</h3>
	<div class="calendar-grid">
		<div class="calendar-header">
			<div class="day-name">Sun</div>
			<div class="day-name">Mon</div>
			<div class="day-name">Tue</div>
			<div class="day-name">Wed</div>
			<div class="day-name">Thu</div>
			<div class="day-name">Fri</div>
			<div class="day-name">Sat</div>
		</div>
		{#each calendarDates as date}
			<div 
				class="calendar-date {date.isCurrentMonth ? 'current-month' : 'other-month'} {date.isToday ? 'today' : ''} {date.dateString === pathname ? 'selected' : ''}"
				on:click={() => handleCalendarDateClick(date.dateString)}
				role="button"
				tabindex="0"
				on:keydown={(e) => e.key === 'Enter' && handleCalendarDateClick(date.dateString)}
			>
				<div class="date-number">{date.day}</div>
				{#if date.calories !== undefined && date.calories !== null}
					<div class="calories-display">{date.calories}</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<section class="todays-calories">
	<div class="calorie-input-container">
		<label for="calories">Calories for {pathname}</label>
		<div class="input-group">
			<input 
				id="calories" 
				type="number" 
				placeholder="Enter calories..."
				bind:value={$calorieDateMap[pathname]} 
				bind:this={calorieInput}
				on:keydown={(e) => e.key === 'Enter' && handleSaveAndNext()}
			/>
			<button class="save-button" on:click={handleSaveAndNext}>
				Save & Next →
			</button>
		</div>
		{#if $calorieDateMap[pathname]}
			<div class="calorie-feedback">
				✓ {$calorieDateMap[pathname]} calories recorded
			</div>
		{/if}
	</div>
</section>

<section class="calorie-averages">
	<div class="averages-container">
		<h3 class="averages-title">Rolling Averages</h3>
		<div class="averages-grid">
			<div class="average-card">
				<div class="average-period">
					<span class="period-icon">📊</span>
					<span class="period-text">3 Days</span>
				</div>
				<div class="average-value">
					{calcNDay(pathname, 3, $calorieDateMap) || notEnoughData}
					{#if calcNDay(pathname, 3, $calorieDateMap)}
						<span class="value-unit">cal/day</span>
					{/if}
				</div>
			</div>

			<div class="average-card">
				<div class="average-period">
					<span class="period-icon">📈</span>
					<span class="period-text">5 Days</span>
				</div>
				<div class="average-value">
					{calcNDay(pathname, 5, $calorieDateMap) || notEnoughData}
					{#if calcNDay(pathname, 5, $calorieDateMap)}
						<span class="value-unit">cal/day</span>
					{/if}
				</div>
			</div>

			<div class="average-card">
				<div class="average-period">
					<span class="period-icon">📅</span>
					<span class="period-text">2 Weeks</span>
				</div>
				<div class="average-value">
					{calcNDay(pathname, 14, $calorieDateMap) || notEnoughData}
					{#if calcNDay(pathname, 14, $calorieDateMap)}
						<span class="value-unit">cal/day</span>
					{/if}
				</div>
			</div>

			<div class="average-card">
				<div class="average-period">
					<span class="period-icon">🗓️</span>
					<span class="period-text">1 Month</span>
				</div>
				<div class="average-value">
					{calcNDay(pathname, 30, $calorieDateMap) || notEnoughData}
					{#if calcNDay(pathname, 30, $calorieDateMap)}
						<span class="value-unit">cal/day</span>
					{/if}
				</div>
			</div>
		</div>
		
		<!-- Add some helpful context -->
		<div class="averages-info">
			<p>💡 Rolling averages help smooth out daily fluctuations and show trends over time.</p>
		</div>
	</div>
</section>
<DataTransfers/>

<section class="reset-section">
	<button class="reset-trigger-button" on:click={() => showResetModal = true}>
		🗑️ Reset All Data
	</button>
	
	{#if resetSuccess}
		<div class="reset-success-message">
			✅ All calorie data has been successfully reset!
		</div>
	{/if}
</section>


<!-- Reset modal -->
{#if showResetModal}
	<div class="modal-backdrop" on:click={closeModal} role="dialog" aria-modal="true">
		<div class="modal-content" on:click|stopPropagation>
			<div class="modal-header">
				<h3>⚠️ Confirm Data Reset</h3>
				<button class="modal-close" on:click={closeModal} aria-label="Close modal">
					✕
				</button>
			</div>
			
			<div class="modal-body">
				<p>Are you sure you want to permanently delete all your calorie recordings?</p>
				<p class="warning-text">This action cannot be undone and will remove all historical data.</p>
				
				<div class="data-summary">
					<strong>You currently have data for {Object.keys($calorieDateMap).filter(key => $calorieDateMap[key] !== null).length} days</strong>
				</div>
			</div>
			
			<div class="modal-footer">
				<button class="cancel-button" on:click={closeModal}>
					Cancel
				</button>
				<button class="confirm-reset-button" on:click={confirmReset}>
					Yes, Reset All Data
				</button>
			</div>
		</div>
	</div>
{/if}

