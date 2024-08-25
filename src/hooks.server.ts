// src/hooks.server.ts
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Check for an access token in the cookies
    const access_token = event.cookies.get('access_token');

    // Attach token to request headers if it exists
    if (access_token) {
        event.request.headers.set('Authorization', `Bearer ${access_token}`);
    }

    // Extract the pathname for the current request
    // Define which paths require authentication

    // Check if the current path is protected
    

    const response = await resolve(event);

    return response;
};
