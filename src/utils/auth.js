import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

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
		// //shauns code
		// loggedIn.update((value) => {
		// 	return true;
		// });
		// goto('/');
		//shauns code
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
