<script>
	import { goto } from '$app/navigation';
	export let data;

	// Function to log the session when the button is clicked
	function logSession() {
		fetch('/create-checkout-session', {
			method: 'POST'
			// You can include any necessary request headers here
		})
			.then((response) => response.json())
			.then((session) => {
				console.log(session);
				// You can also perform any other actions here, such as redirecting to the Stripe Checkout page
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
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
			<form action="/create-checkout-session" method="POST">
				<button on:click={logSession} type="submit">Checkout</button>
			</form>
		</div>
	{/each}
</div>
