<script>
	import { pbStore } from './stores.js';
	import Router from 'svelte-spa-router';
	import routes from './routes.js';

	pbStore.set('https://obedient-hydrogen.pockethost.io');
</script>

<Router {routes} />