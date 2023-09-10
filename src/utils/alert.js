import { writable } from 'svelte/store';

export const alertMessage = writable('');
export const warningAlert = writable(false);
export const successAlert = writable(false);

// create timeout to hide alerts
let timeoutId;

function resetTimeout() {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		const variable = [warningAlert, successAlert];
		variable.forEach((index) => index.set(false));
	}, 3000);
}

// create all alert functions

//logout fail alert
export function logoutFailAlert() {
	warningAlert.set(true);
	alertMessage.set('There was an issue logging out');
	resetTimeout();
}

export function signUpAlert() {
	// used
	successAlert.set(true);
	alertMessage.set('sign up successful');
	resetTimeout();
}

// uploading images alert success
export function uploadImageSuc() {
	successAlert.set(true);
	alertMessage.set('Successfully uploaded image!');
	resetTimeout();
}

export function uploadImageFail() {
	successAlert.set(true);
	alertMessage.set('There was an issue uploading your image. Please try again');
	resetTimeout();
}

// deleting images alert

export function delImageSuc() {
	successAlert.set(true);
	alertMessage.set(
		'Successfully deleted image. Please refresh your page to see your updated images'
	);
	resetTimeout();
}

export function delImageFail() {
	warningAlert.set(true);
	alertMessage.set('Unable to delete image');
	resetTimeout();
}

export function signUpEmailTaken() {
	warningAlert.set(true);
	alertMessage.set('Email already taken');
	resetTimeout();
}

// export function logInAlert() {
// 	warningAlert.set(true);
// 	alertMessage.set('Please log in first!');
// 	resetTimeout();
// }

export function showLoginAlert() {
	//used
	warningAlert.set(true);
	alertMessage.set('Please check username/password');
	resetTimeout();
}

// export function showEditAlert() {
// 	//used
// 	warningAlert.set(true);
// 	alertMessage.set('Failed to edit job !');
// 	resetTimeout();
// }

// export function showJobAlert() {
// 	//used
// 	warningAlert.set(true);
// 	alertMessage.set('Failed to create job !');
// 	resetTimeout();
// }

export function loginSucAlert() {
	//used
	successAlert.set(true);
	alertMessage.set('Successfully Logged In !');
	resetTimeout();
}

// export function createJobAlert() {
// 	//used
// 	successAlert.set(true);
// 	alertMessage.set('Successfully Created Job !');
// 	resetTimeout();
// }
