<script lang="ts">
    import { onMount } from 'svelte';

    // Define an interface for the user data structure
    interface UserData {
        name?: string;
        email?: string;
        // Add other properties that you expect to receive from the API
    }

    let userData: UserData = {};

    onMount(async () => {
        try {
            const response = await fetch('https://webapiweb.online:8000/me', {
                method: 'GET',
                credentials: 'include', // This will include cookies in the request
            });

            if (response.ok) {
                userData = await response.json() as UserData;
            } else {
                console.error('Unauthorized or error response');
                //window.location.href = '/Login';
            }
        } catch (error) {
            console.error('Error:', error);
            //window.location.href = '/Login';
        }
    });
</script>

{#if Object.keys(userData).length > 0}
    <h1>Welcome, {userData.name || 'User'}</h1>
{:else}
    <p>Loading...</p>
{/if}

