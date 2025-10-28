<script lang="ts">
    import CalendarNav from '$lib/components/CalendarNav.svelte';
    import { formatCurrentDate } from '$lib/dateHelpers';
    import { updateDateQuery } from '$lib/updateDate';
    export let selectedDate: string;
</script>

<div class="calendar-header">
   <h3>{formatCurrentDate(selectedDate)}</h3>
      <div class="today-yesterday">
          <button on:click={() => updateDateQuery(selectedDate, 'today')}>
            TODAY
          </button>
          <button on:click={() => updateDateQuery(selectedDate, 'yesterday')}>
            YESTERDAY
          </button>
      </div>
  <CalendarNav
      selectedDate={selectedDate}
  />
</div>

<style>
    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .today-yesterday{
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    button {
        background: none;
        border-radius: 2px;
        color: var(--color-theme-2);
        font-size: .5em;
        cursor: pointer;
        border: none;
    }

    button:hover {
        color: white;
    }

    h3 {
        margin: 0;
        font-size: 1.2rem;
        min-width: 115px;
    }

    /* Mobile styles */
    @media (max-width: 640px) {
        h3 {
            font-size: 1rem;
        }

        .calendar-header {
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        button {
            font-size: 0.45em;
        }
    }


</style>