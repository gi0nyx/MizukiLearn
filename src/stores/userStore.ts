// src/stores/userStore.ts
import { writable } from 'svelte/store';

export const userData = writable(null);

export async function fetchAndSetUserData() {
    try {
        const response = await fetch('https://webapiweb.online:8000/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            userData.set(data);
        } else {
            console.error('Unauthorized or error response');
            window.location.href = '/Login';
        }
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/Login';
    }
}
