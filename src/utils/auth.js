import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { loggedIn } from '../stores/store';
import { goto } from '$app/navigation';

export async function authenticateUser(email, password) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/auth', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	const res = await resp.json();

	if (resp.status == 200) {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.accessToken, // here i put access token
				user: res.userId
			})
		);
		//shauns code
		loggedIn.update((value) => {
			return true;
		});
		goto('/');
		// shaun's code
		return {
			success: true,
			res: res
		};
	} else {
		console.log('fucking annoying');
		return {
			success: false,
			res: res
		};
	}
}

export function getTokenFromLocalStorage() {
	let auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token'];
	}
	return null;
}

// Define emptyAuth with token and user set to null
const emptyAuth = {
	token: null,
	user: null
};
export function logOut() {
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
	//SHAUNS CODE
	loggedIn.update((value) => {
		return false;
	});
	goto('/');

	//SHAUNS CODE

	return true;
}
