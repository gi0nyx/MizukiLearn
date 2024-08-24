<script>
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';

  let rows = writable([]);
  let searchQuery = writable("");
  let filterByScore = writable("");

  onMount(async () => {
    const url = 'https://webapiweb.online:8000/get_values';

    try {
      const response = await fetch(url);
      const { data, status } = await response.json();

      if (status === 'success') {
        rows.set(
          data
            .map(entry => ({
              name: entry[0],
              score: entry[1]
            }))
            .sort((a, b) => b.score - a.score)  // Sort by score in descending order
            .map((entry, index) => ({
              rank: index + 1,  // Add rank based on position in sorted array
              ...entry
            }))
        );
      } else {
        console.error('API responded with status:', status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  const filteredRows = derived(
    [rows, searchQuery, filterByScore],
    ([$rows, $searchQuery, $filterByScore]) => {
      return $rows.filter(row => {
        const nameMatches = row.name.toLowerCase().includes($searchQuery.toLowerCase());
        const scoreMatches = !$filterByScore || row.score >= $filterByScore;
        return nameMatches && scoreMatches;
      });
    }
  );
</script>

<section class="leaderboard">
  <div class="filters">
    <input
      type="text"
      placeholder="Search by name"
      bind:value={$searchQuery}
      class="filter-input"
    />
    <input
      type="number"
      placeholder="Filter by minimum score"
      bind:value={$filterByScore}
      class="filter-input"
      min="0"
    />
  </div>

  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {#each $filteredRows as row (row.rank)}
        <tr>
          <td>{row.rank}</td>
          <td>{row.name}</td>
          <td>{row.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<footer>
  <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
</footer>

<style>
  /* Background */
  body {
    background: linear-gradient(135deg, #89cff0, #0066cc);
    font-family: 'Arial', sans-serif;
  }

  .leaderboard {
    margin-top: 2%;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    border: 2px solid #82b1ff;
    border-radius: 15px;
    padding: 20px;
    width: 85%;
    min-height: 70vh;
    margin-left: auto;
    margin-right: auto;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    position: relative;
  }

  /* Wave-like animation */
  

  @keyframes wave {
    from { background-position-x: 0; }
    to { background-position-x: 1000px; }
  }

  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    position: relative;
    z-index: 2;
  }

  .filter-input {
    width: 45%;
    padding: 12px;
    border: 2px solid #82b1ff;
    border-radius: 12px;
    font-size: 16px;
    background-color: #f0f8ff;
    color: #0066cc;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    position: relative;
    z-index: 2;
  }

  th, td {
    border: 1px solid #82b1ff;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    color: #0066cc;
  }

  th {
    background-color: rgba(130, 177, 255, 0.9);
    font-weight: bold;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  tbody tr:nth-child(even) {
    background-color: rgba(173, 216, 230, 0.3);  /* Lighter blue */
  }

  tbody tr:nth-child(odd) {
    background-color: rgba(173, 216, 230, 0.15); /* Even lighter blue */
  }

  tbody tr:hover {
    background-color: rgba(173, 216, 230, 0.5);
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
