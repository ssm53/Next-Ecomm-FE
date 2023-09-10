export const ssr = false; // this essentially turns our entire project into true SPA mode. No JS code will execute server side.

import { isLoggedIn } from '../utils/auth';

let hasCheckedLoggedIn = false; // Add this flag

export async function load() {
	if (!hasCheckedLoggedIn) {
		// Check if isLoggedIn has been called before
		await isLoggedIn();
		hasCheckedLoggedIn = true; // Set the flag to true to prevent further calls
	}
}
