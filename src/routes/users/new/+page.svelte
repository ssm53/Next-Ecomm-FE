<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { signUpAlert, signUpEmailTaken } from '../../../utils/alert';

	let formErrors = {};

	export function postSignUp() {
		signUpAlert();
		goto('/');
	}

	async function createUser(evt) {
		evt.preventDefault();

		// if (evt.target['password'].value != evt.target['password-confirmation'].value) {
		// 	formErrors['password'] = { message: 'Password confirmation does not match' };
		// 	return;
		// }

		const userData = {
			name: evt.target['name'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value
			// passwordConfirm: evt.target['password-confirmation'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.status == 200) {
			postSignUp();

			// const res = await authenticateUser(userData.username, userData.password);

			// if (res.success) {
			// 	postSignUp();
			// } else {
			// 	throw 'Sign up succeeded but authentication failed';
			// }
		} else if (resp.status == 500) {
			signUpEmailTaken();
		} else {
			const res = await resp.json();

			// formErrors = res.data;
			if (res.error) {
				formErrors = res.error; // Update formErrors with validation errors
			}
		}
	}
</script>

<div class="bg-white min-h-screen">
	<header class="bg-gray-100 shadow">
		<div class="container mx-auto py-4">
			<h1 class="text-2xl font-semibold text-gray-900">Sign Up for an Account</h1>
		</div>
	</header>

	<main class="container mx-auto py-8">
		<div class="flex justify-center items-center">
			<form on:submit={createUser} class="w-1/2 bg-white shadow-md rounded-lg p-8">
				<div class="mb-6">
					<label for="name" class="block text-gray-700 text-sm font-bold mb-2"> Name </label>
					<input
						type="text"
						name="name"
						placeholder="Enter your name"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
					/>
					{#if 'name' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['name']}</p>
					{/if}
				</div>

				<div class="mb-6">
					<label for="email" class="block text-gray-700 text-sm font-bold mb-2"> Email </label>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					{#if 'email' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['email']}</p>
					{/if}
				</div>

				<div class="mb-6">
					<label for="password" class="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					{#if 'password' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors['password']}</p>
					{/if}
				</div>

				<div class="flex justify-end">
					<button
						class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Create an Account
					</button>
				</div>
			</form>
		</div>
	</main>
</div>

<!-- <script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser } from './../../../utils/auth.js';
	import { loggedIn } from '../../../store/store.js';
	import { signUpAlert } from '../../../utils/alert.js';
	let formErrors = {};


	function goBackHome() {
		goto("/");
	}

	function postSignUp() {
		loggedIn.update((value) => {
			return true;
		});
		goto('/jobs/new');
		signUpAlert();
	}

	async function createUser(evt) {
		evt.preventDefault();

		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = { message: 'Password confirmation does not match' };
			return;
		}

		const userData = {
			username: evt.target['username'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value,
			passwordConfirm: evt.target['password-confirmation'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.status == 200) {
			const res = await authenticateUser(userData.username, userData.password);

			if (res.success) {
				postSignUp();
			} else {
				throw 'Sign up succeeded but authentication failed';
			}
		} else {
			const res = await resp.json();
			formErrors = res.data;
		}
	}
</script>




<div class=" bg-black h-screen py-10">
	<h1 class="text-center text-xl text-white">Create an Account to Post a Job</h1>
<div class="text-center">
	<a class="link-hover italic text-xs text-white" href="/login"
		>Already have an account? Click here to login instead.</a
	>
</div>
<div class="flex justify-center items-center mt-8 bg-black">
	<form on:submit={createUser} class="w-1/3">
		<div class="form-control w-full">
			<label class="label" for="username">
				<span class="label-text text-white">Username</span>
			</label>
			<input
				type="text"
				name="username"
				placeholder="johndoe"
				class="input input-bordered w-full  text-white bg-black border-4 border-pink-500"
			/>
			{#if 'username' in formErrors}
				<label class="label" for="username">
					<span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text text-white">Email</span>
			</label>
			<input
				type="email"
				name="email"
				placeholder="john@example.com"
				class="input input-bordered w-full  text-white bg-black border-4 border-pink-500"
				required
			/>
			{#if 'email' in formErrors}
				<label class="label" for="email">
					<span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text text-white">Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder=""
				class="input input-bordered w-full  text-white bg-black border-4 border-pink-500"
				required
			/>
			{#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text text-white">Confirm Password</span>
			</label>
			<input
				type="password"
				name="password-confirmation"
				placeholder=""
				class="input input-bordered w-full  text-white bg-black border-4 border-pink-500"
				required
			/>
			{#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full mt-4">
			<button class="btn btn-md text-white border-4 border-pink-500 bg-black hover:bg-gray-700 hover:shadow hover:shadow-gray-700 hover:text-yellow-100">Create an Account</button>
		</div>
	</form>
</div>

</div> -->
