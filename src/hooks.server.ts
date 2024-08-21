// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Check for an access token in the cookies
    const access_token = event.cookies.get('access_token');

    // Attach token to request headers if it exists
    if (access_token) {
        event.request.headers.set('Authorization', `Bearer ${access_token}`);
    }

    const response = await resolve(event);

    return response;
};
