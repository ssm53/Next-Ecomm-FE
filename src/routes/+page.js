// todo
// implement images

// then once bought it shouldnt be displayed anymore

//EXTRAS
// user should be able to logout
// user should be able to delete their photo - only loggedin and only theirs

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
