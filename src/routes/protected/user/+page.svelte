<script lang="ts">
    import { onMount } from 'svelte';


    let userData = {};

    onMount(async () => {
        try {
            // Extract the token from cookies
            const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
                const [name, value] = cookie.split('=');
                acc[name] = value;
                return acc;
            }, {} as Record<string, string>);
            const token = cookies['access_token'];

            if (!token) {
                console.error('No token found');
                window.location.href = '/Login';
                return;
            }

            const response = await fetch('https://webapiweb.online:8000/me', {
                method: 'GET',
                credentials: 'include', // This will include cookies in the request
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                userData = data;
            } else {
                console.error('Unauthorized or error response');
                window.location.href = '/Login';
            }
        } catch (error) {
            console.error('Error:', error);
            window.location.href = '/Login';
        }
    });
</script>

{#if userData && Object.keys(userData).length > 0}
    <h1>Welcome</h1>
{:else}
    <p>Loading...</p>
{/if}
