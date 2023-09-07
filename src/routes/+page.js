// todo
// track how much he has earned, and how much we owe him

//EXTRAS
// user should be able to logout, and login - done
// once bought, shouldnt be displayed anymore -
// user should be able to delete their photo - only loggedin and only theirs
// html and styling

//ISSUE

import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/allPics');

	const res = await resp.json();
	if (resp.status == 200) {
		return {
			images: res.allImages
		};
	} else {
		return {
			images: []
		};
	}
}
