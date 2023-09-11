// todo
// fix wrong email and password issue.
// fix verificaton of accesstokens in verifyaccesstokens cause now we got expiry

//EXTRAS
// put api for stripe in env
// marketplace shit
// once bought, shouldnt be displayed anymore!
// loggedin users can favourite pics

// have to make sure to do git pull after merge on github

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
