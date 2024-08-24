import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

interface UserData {
    name?: string;
    email?: string;
    isAuthenticated: boolean;
    // Add other properties as needed
}

const initialUserData: UserData = {
    isAuthenticated: false
};

const userData = writable<UserData>(initialUserData);

async function fetchUserData() {
    try {
        const response = await fetch('https://webapiweb.online:8000/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data: UserData = await response.json();
            userData.set({ ...data, isAuthenticated: true });
        } else {
            console.error('Unauthorized or error response');
            userData.set(initialUserData);
            goto('/Login');
        }
    } catch (error) {
        console.error('Error:', error);
        userData.set(initialUserData);
        goto('/Login');
    }
}

function checkAuth() {
    return new Promise<boolean>((resolve) => {
        const unsubscribe = userData.subscribe(user => {
            if (user.isAuthenticated) {
                unsubscribe();
                resolve(true);
            } else {
                fetchUserData().then(() => {
                    unsubscribe();
                    resolve(user.isAuthenticated);
                });
            }
        });
    });
}

export { userData, fetchUserData, checkAuth };