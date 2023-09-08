import { writable } from 'svelte/store';

export const loggedIn = writable(false);

export const loading = writable(false);
