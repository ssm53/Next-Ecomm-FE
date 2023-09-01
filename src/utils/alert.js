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
	}, 5000);
}

// create all alert functions

// export function signUpAlert() {
// 	// used
// 	successAlert.set(true);
// 	alertMessage.set('sign up successful');
// 	resetTimeout();
// }

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
