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

<div class="bg-gray-100 min-h-screen">
	<header class="bg-white shadow">
		<div class="container mx-auto py-4">
			<h1 class="text-2xl font-semibold">Welcome to Our Store</h1>
		</div>
	</header>

	<main class="container mx-auto py-8">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.images as image (image.id)}
				<div class="bg-white rounded-lg shadow-lg overflow-hidden">
					<img src={image.url} alt="Product" class="w-full h-64 object-cover" />
					<div class="p-4">
						<h2 class="text-lg font-semibold">{image.title}</h2>
						<p class="text-gray-600">{image.description}</p>
						<div class="flex items-center justify-between mt-4">
							<span class="text-xl font-semibold">${image.price}</span>
							<button
								class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
								on:click={() => checkout(image.id)}
							>
								Buy Now
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</main>
</div>
