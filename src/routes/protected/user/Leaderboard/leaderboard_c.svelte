<script>
  import { writable, derived,} from 'svelte/store';
  import { onMount } from 'svelte';

  export let data = [];

  let countdown = writable("00:00:00");

  function getTimeUntilNextSunday() {
    const now = new Date();
    
    
    const daysUntilSunday = (7 - now.getUTCDay()) % 7;
    //console.log(daysUntilSunday);
    
    const nextSunday = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysUntilSunday)
    );
    //console.log(nextSunday.getTime() - now.getTime())
    return nextSunday.getTime() - now.getTime();
}


  function updateCountdown() {
    const timeLeft = getTimeUntilNextSunday();

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Here, we only show hours, minutes, and seconds, as days are not part of your original format
      countdown.set(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    } else {
      countdown.set("00:00:00");
      // Here you might want to do something when the countdown reaches zero, like reset or trigger an event
    }
  }

  onMount(() => {
    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup on component destroy
  });




  let rows = writable(
    data.sort((a, b) => b.score - a.score)
        .map((entry, index) => ({
          rank: index + 1,
          ...entry
        }))
  );

  let searchQuery = writable("");
  let filterByScore = writable("");

  $: {
    rows.set(
      data.sort((a, b) => b.score - a.score)
          .map((entry, index) => ({
            rank: index + 1,
            ...entry
          }))
    );
  }

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

    <div>Next Reset: {$countdown}</div>
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
        <th>Again</th>
        <th>Hard</th>
        <th>Good</th>
        <th>Easy</th>
      </tr>
    </thead>
    <tbody>
      {#each $filteredRows as row (row.rank)}
        <tr>
          <td>{row.rank}</td>
          <td>{row.name}</td>
          <td>{row.score}</td>
          <td>{row.again}</td>
          <td>{row.hard}</td>
          <td>{row.good}</td>
          <td>{row.easy}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
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
    background-color: rgba(173, 216, 230, 0.3);
  }

  tbody tr:nth-child(odd) {
    background-color: rgba(173, 216, 230, 0.15);
  }

  tbody tr:hover {
    background-color: rgba(173, 216, 230, 0.5);
  }
</style>
