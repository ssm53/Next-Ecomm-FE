<script>
	import { loading } from '../stores/store';
</script>

{#if $loading}
	<div class="loader" />
{/if}

<style>
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
		transition: opacity 0.75s, visibility 0.75s;
	}

	.loader::after {
		content: '';
		width: 75px;
		height: 75px;
		border: 15px solid lightgrey;
		border-top-color: darkviolet;
		border-radius: 50%;
		animation: loading 0.75s ease infinite;
	}

	@keyframes loading {
		from {
			transform: rotate(0turn);
		}
		to {
			transform: rotate(1turn);
		}
	}
</style>
