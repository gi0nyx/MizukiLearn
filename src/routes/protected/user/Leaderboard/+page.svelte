<script>
  import { onMount } from 'svelte';
  import Leaderboard from './leaderboard_c.svelte';
  import { writable } from 'svelte/store';

  let rows = [];

  onMount(async () => {
    const url = 'https://webapiweb.online:8000/get_values';

    try {
      const response = await fetch(url);
      const { data, status } = await response.json();

      if (status === 'success') {
        rows = data.map(entry => ({
          name: entry[0],
          score: entry[1]
        }));
      } else {
        console.error('API responded with status:', status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
</script>

<Leaderboard data={rows} />

<footer>
  <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
</footer>

<style>
  /* Global styles */
  :global(body) {
    background: linear-gradient(135deg, #89cff0, #0066cc);
    font-family: 'Arial', sans-serif;
  }

  /* Footer styling */
  footer {
    background-color: #0066cc;
    color: white;
    text-align: center;
    padding: 1.5rem;
    margin-top: 2rem;
    border-radius: 0 0 15px 15px;
  }
</style>
