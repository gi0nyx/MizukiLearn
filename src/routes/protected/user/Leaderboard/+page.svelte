<script>
  import { onMount } from 'svelte';
  import Leaderboard from './leaderboard_c.svelte';
  import { writable } from 'svelte/store';
  import {userData} from '../../../../stores/userStore'

  let rows = [];
  let custom_rows = [];
  let selectedOption = 'global';
  let leaderboardName = '';  
  let customOption = '';
  let create_passcode = '';
  let create_leaderboardName = '';
  let join_leaderboardName = '';
  let join_passcode = '';
  let leaderboardExists = false;

  let user;
  userData.subscribe(value => {
    user = value;
  });

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
          score: entry[1],
          again: entry[2],
          hard: entry[3],
          good: entry[4],
          easy: entry[5]
        }));
      } else {
        console.error('API responded with status:', status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchCustomLeaderboard() {
    const url = `https://webapiweb.online:8000/get_users_by_leaderboard?leaderboard_name=${encodeURIComponent(leaderboardName)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const { data, status } = await response.json();

      if (status === 'success') {
        custom_rows = data.map(entry => ({
          name: entry[0],
          score: entry[1],
          again: entry[2],
          hard: entry[3],
          good: entry[4],
          easy: entry[5]
        }));
      } else {
        console.error('API responded with status:', status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchLeaderboardName() {
    const url = `https://webapiweb.online:8000/get_leaderboard_name?email=${encodeURIComponent(user.email)}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const { status, leaderboard_name, message } = await response.json();

      if (status === 'success' && leaderboard_name !== 'None') {
        leaderboardName = leaderboard_name;
        leaderboardExists = true;
        await fetchCustomLeaderboard();
      } else if (status === 'error') {
        console.error(message);
      } else {
        leaderboardExists = false;
        console.log("No leaderboard found, you need to create/join a leaderboard.");
      }
    } catch (error) {
      console.error('Error fetching leaderboard name:', error);
    }
  }

  async function joinLeaderboard() {
    const url = 'https://webapiweb.online:8000/join_leaderboard';
    const payload = { leaderboard_name: join_leaderboardName, user_email: user.email, passcode: join_passcode };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const { status, message } = await response.json();

      if (status === 'success') {
        console.log('Successfully joined leaderboard:', message);
        await fetchLeaderboardName();
      } else {
        console.error('Failed to join leaderboard:', message);
      }
    } catch (error) {
      console.error('Error joining leaderboard:', error);
    }
  }

  async function createLeaderboard() {
    const url = 'https://webapiweb.online:8000/create_leaderboard';
    const payload = { name: create_leaderboardName, creator_email: user.email, passcode: create_passcode };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const { status, message } = await response.json();

      if (status === 'success') {
        console.log('Successfully created leaderboard:', message);
        await fetchLeaderboardName();
      } else {
        console.error('Failed to create leaderboard:', message);
      }
    } catch (error) {
      console.error('Error creating leaderboard:', error);
    }
  }

  function handleCustomOptionChange(option) {
    customOption = option;
    if (option === 'view') {
      fetchLeaderboardName();
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
      <button class:active={customOption === 'view'} on:click={() => handleCustomOptionChange('view')}>View</button>
      <button class:active={customOption === 'join'} on:click={() => handleCustomOptionChange('join')}>Join</button>
      <button class:active={customOption === 'create'} on:click={() => handleCustomOptionChange('create')}>Create</button>
    </div>

    {#if customOption === 'view'}
      {#if leaderboardExists}
        <h2>Custom Leaderboard: {leaderboardName}</h2>
        <Leaderboard data={custom_rows} />
      {:else}
        <p>You haven't joined or created a custom leaderboard yet.</p>
      {/if}
    {:else if customOption === 'join'}
      <form class="custom-form" on:submit|preventDefault={joinLeaderboard}>
        <h2>Join Custom Leaderboard</h2>
        <input type="text" bind:value={join_leaderboardName} placeholder="Leaderboard Name" required>
        <input type="text" bind:value={join_passcode} placeholder="Enter passcode" required>
        <button type="submit">Join</button>
      </form>
    {:else if customOption === 'create'}
      <form class="custom-form" on:submit|preventDefault={createLeaderboard}>
        <h2>Create Custom Leaderboard</h2>
        <input type="text" bind:value={create_leaderboardName} placeholder="Leaderboard Name" required>
        <input type="text" bind:value={create_passcode} placeholder="Create passcode" required>
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