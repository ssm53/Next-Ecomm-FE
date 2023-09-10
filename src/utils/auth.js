import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { loggedIn } from '../stores/store';
import { goto } from '$app/navigation';
import { loading } from '../stores/store';
import { logoutFailAlert, showLoginAlert } from './alert';

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

export function getRefreshTokenFromLocalStorage() {
	let auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['refreshToken'];
	}
	return null;
}

// PROPER LOGOUT FUNCTION
export async function logOut() {
	// spinner shits
	loading.update((value) => {
		return true;
	});
	try {
		let userID = '';
		let auth = localStorage.getItem('auth');
		if (auth) {
			userID = JSON.parse(auth)['user'];
		}
		// so now here this will be our body
		let userData = {
			user: userID
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// Authorization: getTokenFromLocalStorage()
			},
			body: JSON.stringify(userData)
		});

		const res = await resp.json();

		if (resp.status == 200) {
			loading.update((value) => {
				return false;
			});

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
			goto('/sign-in');
		} else {
			loading.update((value) => {
				return false;
			});
			logoutFailAlert();
		}
	} catch (error) {
		loading.update((value) => {
			return false;
		});
		logoutFailAlert();
	}
}

export default function getUserId() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['user'];
	}
	return null;
}

// proper isloggedinfunction
// need to send refreshtoken and userid as body.. can get it from local storage
export async function isLoggedIn() {
	if (!getTokenFromLocalStorage()) {
		loggedIn.update((value) => {
			return false;
		});
	}

	let passedRefreshToken = '';
	let passedUser = '';

	const authDataString = localStorage.getItem('auth'); // Get the auth data as a string from localStorage
	if (authDataString) {
		const authData = JSON.parse(authDataString); // Parse the JSON string into an object
		passedRefreshToken = authData.refreshToken;
		passedUser = authData.user;
	}

	let bodyDetails = {
		user: passedUser,
		refreshToken: passedRefreshToken
	};

	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/authRefresh', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getTokenFromLocalStorage()
		},
		body: JSON.stringify(bodyDetails)
	});

	const res = await resp.json();
	if (resp.status == 200) {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.token,
				refreshToken: res.refreshToken,
				user: res.userId
			})
		);

		loggedIn.update((value) => {
			return true;
		});
	} else {
		loggedIn.update((value) => {
			return false;
		});
	}
}

// // old part of our isloggedin function
// here we need to get userid from our local storage
// need to add body request

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

// // basic isloggedinfunction
// export async function isLoggedIn() {
// 	if (!getTokenFromLocalStorage()) {
// 		loggedIn.update((value) => {
// 			return false;
// 		});
// 	} else
// 		loggedIn.update((value) => {
// 			return true;
// 		});

// 	}

// // OLD LOGOUT FUNCTION
// export function logOut() {
// 	const authData = JSON.parse(localStorage.getItem('auth') || '{}'); // Retrieve the current auth data or use an empty object if it doesn't exist

// 	// Clear only the token field while keeping the user field intact
// 	authData.token = '';
// 	authData.refreshToken = '';
// 	// need to do the same for refreshtokens later

// 	localStorage.setItem('auth', JSON.stringify(authData));
// 	//SHAUNS CODE
// 	loggedIn.update((value) => {
// 		return false;
// 	});
// 	goto('/');

// 	//SHAUNS CODE

// 	return true;
// }

// empmty auth last time
// // Define emptyAuth with token and user set to null.. can put null or empty
// const emptyAuth = {
// 	token: '',
// 	user: ''
// };
