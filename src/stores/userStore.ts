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
        let unsubscribe: () => void; // Declare the unsubscribe variable

        // Use a local flag to track if the user is already authenticated
        let alreadyAuthenticated = false;

        // Subscribe to the store and assign `unsubscribe`
        unsubscribe = userData.subscribe(user => {
            if (user.isAuthenticated) {
                alreadyAuthenticated = true;
                if (unsubscribe) unsubscribe();  // Unsubscribe safely if it exists
                resolve(true);
            }
        });

        // If not authenticated, fetch user data and resolve after
        if (!alreadyAuthenticated) {
            fetchUserData().then(() => {
                let currentUser: UserData | undefined;

                // Subscribe to the store to get the current value
                const unsubscribeFetch = userData.subscribe(user => {
                    currentUser = user;
                });

                // Unsubscribe from the store after getting the value
                unsubscribeFetch();

                if (currentUser) {
                    resolve(currentUser.isAuthenticated);
                } else {
                    resolve(false);  // In case there's no user data
                }
            });
        }
    });
}



export { userData, fetchUserData, checkAuth };