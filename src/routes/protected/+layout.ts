// src/routes/protected/+layout.ts
import { checkAuth } from '../../stores/userStore';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
  if (typeof window !== 'undefined') {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      throw redirect(307, `/Login?redirectTo=${url.pathname}`);
    }
  }
  return {};
}