<script>
  import { onMount } from 'svelte';
  import Leaderboard from './leaderboard_c.svelte';
  import { writable } from 'svelte/store';

  let rows = [];
  let selectedOption = 'global';
  let customOption = '';

  onMount(async () => {
    if (selectedOption === 'global') {
      await fetchGlobalLeaderboard();
    }
  });

  async function fetchGlobalLeaderboard() {
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
  }
</script>

<main>
  <h1>Leaderboard</h1>
  
  <div class="options">
    <button class:active={selectedOption === 'global'} on:click={() => { selectedOption = 'global'; fetchGlobalLeaderboard(); }}>Global</button>
    <button class:active={selectedOption === 'custom'} on:click={() => selectedOption = 'custom'}>Custom</button>
  </div>

  {#if selectedOption === 'global'}
    <Leaderboard data={rows} />
  {:else if selectedOption === 'custom'}
    <div class="custom-options">
      <button class:active={customOption === 'view'} on:click={() => customOption = 'view'}>View</button>
      <button class:active={customOption === 'join'} on:click={() => customOption = 'join'}>Join</button>
      <button class:active={customOption === 'create'} on:click={() => customOption = 'create'}>Create</button>
    </div>

    {#if customOption === 'view'}
      <!-- Add component for viewing custom leaderboards -->
      <p>View custom leaderboards (Component to be added)</p>
    {:else if customOption === 'join'}
      <form class="custom-form">
        <h2>Join Custom Leaderboard</h2>
        <input type="text" placeholder="Leaderboard Name" required>
        <input type="text" placeholder="Enter passcode" required>
        <button type="submit">Join</button>
      </form>
    {:else if customOption === 'create'}
      <form class="custom-form">
        <h2>Create Custom Leaderboard</h2>
        <input type="text" placeholder="Leaderboard Name" required>
        <input type="text" placeholder="Create passcode" required>
        <button type="submit">Create</button>
      </form>
    {/if}
  {/if}
</main>

<footer>
  <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
</footer>

<style>
  /* Global styles */
  :root {
            --primary-color: #4a90e2;
            --secondary-color: #f5f7fa;
            --text-color: #333;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--secondary-color);
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #4a90e2;
    text-align: center;
    margin-bottom: 2rem;
  }

  .options, .custom-options {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #0066cc;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover, button.active {
    background-color: #004c99;
  }

  .custom-form {
    background: rgba(255, 255, 255, 0.85);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  }

  .custom-form h2 {
    color: #0066cc;
    margin-bottom: 1rem;
  }

  .custom-form input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #82b1ff;
    border-radius: 5px;
  }

  .custom-form button {
    width: 100%;
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