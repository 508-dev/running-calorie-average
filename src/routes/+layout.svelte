<script>
	import Header from '$lib/components/Header.svelte';
	import '$/styles/styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer></footer>
</div>

<style>
</style>
