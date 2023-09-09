import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { loggedIn } from '../stores/store';
import { goto } from '$app/navigation';
import { loading } from '../stores/store';
import { showLoginAlert } from './alert';

// original authenticate uer function
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
		// const res = await resp.json();
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.accessToken, // here i put access token
				refreshToken: res.refreshToken,
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
		return {
			success: false,
			res: res // so when our user has correct format, but wrong email, res is object with the error
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

// // Define emptyAuth with token and user set to null.. can put null or empty
// const emptyAuth = {
// 	token: '',
// 	user: ''
// };

export function logOut() {
	const authData = JSON.parse(localStorage.getItem('auth') || '{}'); // Retrieve the current auth data or use an empty object if it doesn't exist

	// Clear only the token field while keeping the user field intact
	authData.token = '';
	authData.refreshToken = '';
	// need to do the same for refreshtokens later

	localStorage.setItem('auth', JSON.stringify(authData));
	//SHAUNS CODE
	loggedIn.update((value) => {
		return false;
	});
	goto('/');

	//SHAUNS CODE

	return true;
}

export default function getUserId() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['user'];
	}
	return null;
}

export async function isLoggedIn() {
	if (!getTokenFromLocalStorage()) {
		loggedIn.update((value) => {
			return false;
		});
	} else
		loggedIn.update((value) => {
			return true;
		});

	// here we need to get userid from our local storage

	// try {
	// 	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/check-login', {
	// 		method: 'POST',
	// 		mode: 'cors',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: getTokenFromLocalStorage()
	// 		}
	// 	});

	// 	const res = await resp.json();
	// 	if (resp.status == 200) {
	// 		localStorage.setItem(
	// 			'auth',
	// 			JSON.stringify({
	// 				token: res.token,
	// 				user: res.record.id
	// 			})
	// 		);
	// 		loggedIn.update((value) => {
	// 			return true;
	// 		});

	// 		return true;
	// 	}

	// 	return false;
	// } catch {
	// 	return false;
	// }
}
