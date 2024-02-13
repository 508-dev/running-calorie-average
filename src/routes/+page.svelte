<script lang="ts">
import { page } from '$app/stores';
import { goto } from "$app/navigation";
import { calorieDateMap } from '../stores.ts';

function updateDateQuery(date: string) {
  const query = new URLSearchParams();
  query.set('date', date);
  goto(`?${query.toString()}`);

}

let pathname = '';

page.subscribe($page =>
  pathname = $page.url.searchParams.get('date')
)

// If the date query param is somehow invalid, try to set it to today
if (!pathname || typeof pathname !== 'string' || isNaN(new Date(pathname).valueOf())) {
  updateDateQuery(new Date().toDateString())
}

// If there's no calorie set for today, set calories to null
// We can't set to 0, because people might purposefully set to 0 to fast
// So we need to identify which days to "skip" when calculating averages,
// because they forgot to record calories that day,
// and which days were legitimately 0 calories consumed, but tracked
$: if ($calorieDateMap[pathname] === undefined) {
  calorieDateMap.update((map) => {
    return {...map, [pathname]: null}
  })
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
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<nav>
  <button on:click={handleDateBack}>
    {"<"}
  </button>
  <h2>
    {pathname}
  </h2>
  <button on:click={handleDateForward}>
    {">"}
  </button>
</nav>

<section>
	<h3>
    {$calorieDateMap[pathname]}
	</h3>


</section>

<style>
nav {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

}
</style>
