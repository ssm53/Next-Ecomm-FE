<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	export let data;

	async function checkout(id) {
		console.log(id);
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/create-checkout-session', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		const res = await resp.json();
		console.log(res);
		goto(res);
	}

	// async function handleBuy(evt) {
	// 	evt.preventDefault();
	// 	// console.log(evt);

	// 	const imageData = {
	// 		title: evt.target['title'].value,
	// 		description: evt.target['description'].value,
	// 		price: parseInt(evt.target['price'].value) * 100,
	// 		url: evt.target['url'].value
	// 	};
	// 	console.log(imageData);

	// 	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/create-checkout-session', {
	// 		method: 'POST',
	// 		mode: 'cors',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(imageData)
	// 	});
	// 	const res = await resp.json();
	// 	console.log(res);

	// 	goto(res);
	// }
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
			<!-- <form on:submit={checkout(image.id)}> -->
			<!-- <input type="hidden" name="title" value={image.title} />
				<input type="hidden" name="description" value={image.description} />
				<input type="hidden" name="price" value={image.price} />
				<input type="hidden" name="url" value={image.url} /> -->
			<button type="submit" on:click={checkout(image.id)}>Buy Now</button>
			<!-- </form> -->
			<!-- <form action="{PUBLIC_BACKEND_BASE_URL}/create-checkout-session" method="POST">
				<button type="submit">Checkout</button>
			</form> -->
		</div>
	{/each}
</div>
