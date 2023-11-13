<script>
	import { pbStore } from './stores.js';
	import Router from 'svelte-spa-router';
	import routes from './routes.js';
	import { onMount } from 'svelte';

	onMount(() => {
		scrollTo({
			top: 0
		})
	})
	
	pbStore.set('https://obedient-hydrogen.pockethost.io');
</script>

<Router {routes} />