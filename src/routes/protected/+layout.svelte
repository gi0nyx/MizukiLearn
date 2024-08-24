<!-- src/routes/protected/+layout.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { checkAuth } from '../../stores/userStore';
    import { goto } from '$app/navigation';
  
    onMount(async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        goto('/Login');
      }
    });
  </script>
  
  <slot />