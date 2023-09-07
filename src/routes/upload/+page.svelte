<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getTokenFromLocalStorage } from '../../utils/auth';
	// import { signUpAlert, signUpEmailTaken } from '../../../utils/alert';
	import { uploadMedia } from '../../utils/s3-uploader';
	import {
		PUBLIC_AWS_REGION,
		PUBLIC_AWS_BUCKET,
		PUBLIC_IDENTITY_POOL_ID
	} from '$env/static/public';

	let formErrors = {};

	export function postUpload() {
		// signUpAlert();
		goto('/');
	}

	async function uploadImage(evt) {
		// evt.preventDefault();

		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);

		const imageData = {
			title: evt.target['title'].value,
			description: evt.target['description'].value,
			price: parseInt(evt.target['price'].value),
			url: fileUrl // this is our url for the picture... need to update schema also laterr
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getTokenFromLocalStorage()
			},
			body: JSON.stringify(imageData)
		});

		if (resp.status == 200) {
			postUpload();
		} else {
			const res = await resp.json();
			if (res.error) {
				formErrors = res.error; // Update formErrors with validation errors
			}
		}
	}
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="bg-white min-h-screen">
	<header class="bg-gray-100 shadow">
		<div class="container mx-auto py-4">
			<h1 class="text-2xl font-semibold text-gray-900">Upload Your Image</h1>
		</div>
	</header>

	<main class="container mx-auto py-8">
		<div class="flex justify-center items-center">
			<form on:submit|preventDefault={uploadImage} class="w-1/2 bg-white shadow-md rounded-lg p-8">
				<div class="mb-6">
					<label for="file" class="block text-gray-700 text-sm font-bold mb-2">
						Choose an Image
					</label>
					<input
						type="file"
						name="file"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
					/>
					{#if 'file' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['file']}</p>
					{/if}
				</div>

				<div class="mb-6">
					<label for="title" class="block text-gray-700 text-sm font-bold mb-2"> Title </label>
					<input
						type="text"
						name="title"
						placeholder="Enter title"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
					/>
					{#if 'title' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['title']}</p>
					{/if}
				</div>

				<div class="mb-6">
					<label for="description" class="block text-gray-700 text-sm font-bold mb-2">
						Description
					</label>
					<input
						type="text"
						name="description"
						placeholder="Enter description"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					{#if 'description' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['description']}</p>
					{/if}
				</div>

				<div class="mb-6">
					<label for="price" class="block text-gray-700 text-sm font-bold mb-2"> Price </label>
					<input
						type="number"
						name="price"
						placeholder="Enter price"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
						step="1"
					/>
					{#if 'price' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['price']}</p>
					{/if}
				</div>

				<div class="flex justify-end">
					<button
						class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Upload Image
					</button>
				</div>
			</form>
		</div>
	</main>
</div>
