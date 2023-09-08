// todo
// do refresh log out api - to refresh authentication so that even when loggedin, it'll continue to be logged in
// sort out delete api
// sort out only loggedin and see my/images page. if logged out, you get redirected
// 30 mins come on

//EXTRAS
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
