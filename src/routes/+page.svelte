<script>
	import { goto } from '$app/navigation';
</script>

<h1>This is our homepage</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button
	on:click={() => {
		goto('/upload');
	}}>Go to upload</button
>
