// todo
// implement images
// be able to buy images with stripe
// need to create successurl and cancelurl (after payment done etc) - done
// need to specify the product data {name: } in controller.js in backend

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
