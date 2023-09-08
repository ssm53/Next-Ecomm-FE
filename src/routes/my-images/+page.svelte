<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { delImageSuc, delImageFail } from '../../utils/alert.js';
	import Spinner from '../../spinner/spinner.svelte';
	import { loading } from '../../stores/store.js';
	export let data;

	// Function to handle image deletion
	async function deleteImage(imageId) {
		// spinner shits
		loading.update((value) => {
			return true;
		});
		console.log(imageId);
		try {
			const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/deletePic/${imageId}`, {
				method: 'DELETE'
			});

			// const res = await response.json();

			if (response.status === 204) {
				// spinner shits
				loading.update((value) => {
					return false;
				});
				delImageSuc();
				goto('/my-images');
			} else if (response.status === 404) {
				// spinner shits
				loading.update((value) => {
					return false;
				});
				delImageFail();
				const errorData = await response.json();
				// Handle the 404 error, which means the image was not found
				console.error('Image not found:', errorData.error);
			} else {
				// spinner shits
				loading.update((value) => {
					return false;
				});
				delImageFail();
				const errorData = await response.json();
				console.error('Image not found:', errorData.error);
			}
		} catch (error) {
			// spinner shits
			loading.update((value) => {
				return false;
			});
			delImageFail();
			console.error('Error deleting image:', error);
			// return res.error
		}
	}
</script>

<div class="bg-gray-100 min-h-screen">
	<header class="bg-white shadow">
		<div class="container mx-auto py-4">
			<h1 class="text-2xl font-semibold">My Images</h1>
		</div>
	</header>

	<main class="container mx-auto py-8">
		<Spinner />
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.images as image}
				<div class="bg-white rounded-lg shadow-lg overflow-hidden">
					<img src={image.url} alt="Product" class="w-full h-64 object-cover" />
					<div class="p-4">
						<h2 class="text-lg font-semibold">{image.title}</h2>
						<p class="text-gray-600">{image.description}</p>
						<div class="flex items-center justify-between mt-4">
							<span class="text-xl font-semibold">${image.price}</span>
							<!-- Delete Button -->
							<button on:click={deleteImage(image.id)} class="text-red-500 hover:text-red-700 ml-2">
								Delete
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</main>
</div>
