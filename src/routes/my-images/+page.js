import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import getUserId from '../../utils/auth';
import { redirect } from '@sveltejs/kit';

let userId;
let images = [];

export async function load({ fetch }) {
	userId = getUserId();
	console.log(userId);
	console.log(typeof userId);

	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/my-images/${userId}`, {
		method: 'GET'
	});

	const res = await resp.json();

	// added this for redirect
	if (res.userid != userId) {
		console.log('not working aiyo');
		console.log(res);
		throw redirect(307, `/`);
	}

	if (resp.status === 200) {
		return {
			images: res.myImages
		};
	} else {
		return {
			images: []
		};
	}
}

// 	if (resp.status === 200) {
// 		const { images: fetchedImages } = await resp.json();
// 		images = fetchedImages;
// 		console.log(resp.status);
// 	} else {
// 		// Handle errors if needed
// 	}

// 	return { images };
// }

// const res = await resp.json();
// if (resp.status == 200) {
//   return {
//     images: res.allImages
//   };
// } else {
//   return {
//     images: []
//   };
// }
// }
