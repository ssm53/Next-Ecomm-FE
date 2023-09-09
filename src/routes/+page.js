// todo
// // do refresh log out api - to refresh authentication so that even when loggedin, it'll continue to be logged in

//EXTRAS
// put api for stripe in env
// marketplace shit
// once bought, shouldnt be displayed anymore!
// loggedin users can favourite pics

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
