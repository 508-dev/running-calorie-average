<script>
import { page } from '$app/stores';
import { goto } from "$app/navigation";
import { calorieDateMap } from '../stores.ts';
import { onDestroy } from 'svelte';


if (!calorieDateMap[new Date().toDateString()]) {
  calorieDateMap.update((map) => ({...map, [new Date().toDateString()]: 0}))
}

let pathname = '';

page.subscribe($page =>
  pathname = $page.url.searchParams.get('date')
)

if (!pathname || typeof pathname !== 'number' || isNaN(new Date(pathname).valueOf())) {
  const query = new URLSearchParams()
  query.set('date', new Date().toDateString())
  goto(`?${query.toString()}`);
}

function handleClick() {
  let query = new URLSearchParams($page.url.searchParams.toString());
  query.set('test', 'wow')
  goto(`?${query.toString()}`);
}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<nav>
  <button on:click={handleClick}>
    {"<"}
  </button>
  <h2>
    {pathname}
  </h2>
  <button>
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
