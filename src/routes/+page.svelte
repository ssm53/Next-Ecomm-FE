<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	export let data;
</script>

<div class="overflow-x-auto w-full bg-white flex flex-col">
	{#each data.images as image}
		<div class="flex justify-between flex-row">
			<div>
				<span>{image.title}</span>
			</div>
			<div>
				<span>{image.price}</span>
			</div>
			<div>
				<span>{image.description}</span>
			</div>
			<div>
				<img src={image.url} alt="picture" />
			</div>
		</div>
		<div>
			<form action="{PUBLIC_BACKEND_BASE_URL}/create-checkout-session" method="POST">
				<button type="submit">Checkout</button>
			</form>
		</div>
	{/each}
</div>
