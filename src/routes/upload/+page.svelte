<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getTokenFromLocalStorage } from '../../utils/auth';
	// import { signUpAlert, signUpEmailTaken } from '../../../utils/alert';

	let formErrors = {};

	export function postUpload() {
		// signUpAlert();
		goto('/');
	}

	async function uploadImage(evt) {
		evt.preventDefault();

		const imageData = {
			title: evt.target['title'].value,
			description: evt.target['description'].value,
			price: parseInt(evt.target['price'].value)
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

<div class="flex justify-center items-center mt-8 bg-black">
	<form on:submit={uploadImage} class="w-1/3">
		<div class="form-control w-full">
			<label class="label" for="title">
				<span class="label-text text-white">Title</span>
			</label>
			<input
				type="text"
				name="title"
				placeholder="johndoe"
				class="input input-bordered w-full text-white bg-black border-4 border-pink-500"
			/>
			{#if 'title' in formErrors}
				<label class="label" for="title">
					<span class="label-text-alt text-red-500">{formErrors['title']}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="description">
				<span class="label-text text-white">Description</span>
			</label>
			<input
				type="text"
				name="description"
				placeholder="john@example.com"
				class="input input-bordered w-full text-white bg-black border-4 border-pink-500"
				required
			/>
			{#if 'description' in formErrors}
				<label class="label" for="email">
					<span class="label-text-alt text-red-500">{formErrors['description']}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="price">
				<span class="label-text text-white">Price</span>
			</label>
			<input
				type="number"
				name="price"
				placeholder=""
				class="input input-bordered w-full text-white bg-black border-4 border-pink-500"
				required
				step="1"
			/>
			{#if 'price' in formErrors}
				<label class="label" for="price">
					<span class="label-text-alt text-red-500">{formErrors['price']}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full mt-4">
			<button
				class="btn btn-md text-white border-4 border-pink-500 bg-black hover:bg-gray-700 hover:shadow hover:shadow-gray-700 hover:text-yellow-100"
				>Upload Image</button
			>
		</div>
	</form>
</div>
