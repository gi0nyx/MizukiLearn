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
            console.error(`Error: ${response.status} - ${response.statusText}`);
            if (response.status === 401) {
                console.log('User is not authenticated');
            }
            userData.set(initialUserData);
            // Uncomment the following line if you want to redirect to login page
            // await goto('/Login');
        }
    } catch (error) {
        console.error('Network error:', error);
        userData.set(initialUserData);
        // Uncomment the following line if you want to redirect to login page
        // await goto('/Login');
    }
}

function checkAuth() {
    return new Promise<boolean>((resolve) => {
        let unsubscribe: () => void;
        let alreadyAuthenticated = false;

        unsubscribe = userData.subscribe(user => {
            if (user.isAuthenticated) {
                alreadyAuthenticated = true;
                if (unsubscribe) unsubscribe();
                resolve(true);
            }
        });

        if (!alreadyAuthenticated) {
            fetchUserData().then(() => {
                userData.subscribe(user => {
                    if (unsubscribe) unsubscribe();
                    resolve(user.isAuthenticated);
                });
            }).catch(error => {
                console.error('Error in checkAuth:', error);
                if (unsubscribe) unsubscribe();
                resolve(false);
            });
        }
    });
}

export { userData, fetchUserData, checkAuth };