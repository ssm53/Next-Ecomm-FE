<script>
	import { authenticateUser } from '../../utils/auth';
	import { goto } from '$app/navigation';
	// import Spinner from '../../spinner/spinner.svelte';
	// import { loading } from '../../store/store';
	// import { loginSucAlert, showLoginAlert } from '../../utils/alert';

	let formErrors = {};

	let email = '';
	let password = '';

	async function handleSubmit(event) {
		event.preventDefault();
		// // spinner shit
		// loading.update((value) => {
		// 	return true
		// })

		email = event.target.email.value;
		password = event.target.password.value;

		const { success } = await authenticateUser(email, password);

		if (success) {
			// // spinner shits
			// loading.update((value) => {
			// 	return false;
			// });
			// Successful login, navigate to the home page
			goto('/');
			// loginSucAlert();
		} else {
			// formErrors = res.data;
			if (res.error) {
				formErrors = res.error; // Update formErrors with validation errors
			}
			// loading.update((value) => {
			// 	return false;
			// });
			// showLoginAlert();
			// showAlert = true;
		}
	}
</script>

<div class=" bg-black h-screen">
	<!-- <Spinner /> -->
	<div class="flex justify-center py-20">
		<img
			src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
			alt="Home"
			class=" w-32 rounded-lg"
		/>
	</div>

	<div class="flex justify-center items-center py-8">
		<form on:submit={handleSubmit} class="w-1/3">
			<div class="login-control w-full">
				<label class="label" for="email">
					<span class="label-text text-gray-200">Email</span>
				</label>
				<input type="text" name="email" placeholder="johndoe" class="input input-bordered w-full" />
				{#if 'username' in formErrors}
					<label class="label" for="email">
						<span class="label-text-alt text-red-500">{formErrors['email']}</span>
					</label>
				{/if}
			</div>

			<div class="login-control w-full">
				<label class="label" for="password">
					<span class="label-text text-gray-200">Password</span>
				</label>
				<input
					type="password"
					name="password"
					placeholder=""
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password']}</span>
					</label>
				{/if}
			</div>

			<!-- <div class=" relative login-control w-full mt-4 group">
					<div class="absolute w-20 h-10 inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 rounded-lg blur-xl group-hover:opacity-100 transition duration-200"></div>
				  <button class=" relative w-20 h-10 bg-black text-gray-300 group-hover:text-white transition duration-200 rounded-lg ">Login</button>
			</div> -->
			<div class=" relative login-control w-full mt-4 group">
				<button class="neon-button">Login</button>
			</div>
		</form>
	</div>
	<div class="flex flex-col justify-center items-center w-screen">
		<div>
			<p class="text-2xl font-bold text-white">They trust us</p>
		</div>
		<div class=" flex flex-row justify-center bg-gray-400 h-20 w-screen">
			<img
				src="https://metaschool.so/_next/static/media/job-logo-1.11002397.webp"
				alt="ripple logo"
				class=" max-w-full object-scale-down py-5"
			/>
			<img
				src="https://metaschool.so/_next/static/media/job-logo-5.4e6c6ae6.webp"
				alt="ripple logo"
				class=" max-w-full object-scale-down py-5"
			/>
			<img
				src="https://metaschool.so/_next/static/media/job-logo-7.1d699287.webp"
				alt="ripple logo"
				class=" max-w-full object-scale-down py-5"
			/>
			<img
				src="https://metaschool.so/_next/static/media/job-logo-4.5b2a463a.webp"
				alt="ripple logo"
				class=" max-w-full object-scale-down py-5"
			/>
		</div>
	</div>
</div>

<style>
	:root {
		--clr-neon: hsl(317 100% 54%);
		--clr-bg: hsl(323 21% 16%);
	}

	.neon-button {
		font-size: 1rem;
		color: var(--clr-neon);
		display: inline-block;
		cursor: pointer;
		text-decoration: none;
		border: var(--clr-neon) 0.125em solid;
		padding: 0.25em 1em;
		border-radius: 0.25em;

		text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em var(--clr-neon);

		box-shadow: inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon);
		position: relative;
		transition: background-color 100ms linear;
	}

	.neon-button::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		box-shadow: 0 0 2em 0.5em var(--clr-neon);
		opacity: 0;
		transition: opacity 100ms linear;
		background-color: var(--clr-neon);
		z-index: -1;
	}

	.neon-button:hover::before,
	.neon-button:focus::before {
		opacity: 1;
	}

	.neon-button:hover::after,
	.neon-button:focus::after {
		opacity: 1;
	}

	.neon-button::before {
		pointer-events: none;
		content: '';
		position: absolute;
		background: var(--clr-neon);
		top: 120%;
		left: 0;
		width: 100%;
		height: 100%;

		transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
		filter: blur(1.5em);
		opacity: 0.7;
	}

	.neon-button:hover,
	.neon-button:focus {
		background-color: var(--clr-neon);
		color: var(--clr-bg);
		text-shadow: none;
	}

	.neon-button::after {
	}
</style>
