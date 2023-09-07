<script>
	import { loggedIn } from '../stores/store';
	import { logOut } from './auth';
	import { goto } from '$app/navigation';

	let logIO;
	loggedIn.subscribe((value) => {
		logIO = value;
	});

	async function clickLogin() {
		goto('/sign-in');
	}

	// function clickPostJob() {
	// 	if (logIO === false) {
	// 		goto('/users/new');
	// 	} else {
	// 		goto('/jobs/new');
	// 	}
	// }

	function clickSignUp() {
		goto('/users/new');
	}

	function clickHome() {
		goto('/');
	}
</script>

<main>
	<div class=" bg-gray-700 flex flex-row h-14 justify-between items-center text-gray-700">
		<div>
			<button
				class=" ml-5 bg-black text-w p-3 rounded-full hover:shadow hover:shadow-white"
				on:click={clickHome}
			>
				<img
					src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
					alt="Home"
					class="w-8 h-7"
				/>
			</button>
		</div>
		<div class="flex">
			{#if logIO === true}
				<div>
					<button
						class=" bg-black text-white border-2 border-pink-500 p-3 rounded-full hover:shadow hover:shadow-white mr-5 w-40"
						on:click={logOut}>log out</button
					>
				</div>
			{:else}
				<div>
					<button
						class=" bg-black text-white border-2 border-pink-500 p-3 rounded-full hover:shadow hover:shadow-white mr-5 w-40"
						on:click={clickLogin}>log in</button
					>
				</div>
				<div>
					<button
						class=" mr-5 bg-black text-white border-2 border-pink-500 p-3 rounded-full hover:shadow hover:shadow-white w-40"
						on:click={clickSignUp}>Sign Up</button
					>
				</div>
			{/if}
			<!-- <div>
				<button
					class=" mr-5 bg-black text-white border-2 border-pink-500 p-3 rounded-full hover:shadow hover:shadow-white w-40"
					on:click={clickPostJob}>post a job</button
				>
			</div> -->
		</div>
	</div>
</main>
