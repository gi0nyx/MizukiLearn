<script>
import SvelteTable from "svelte-table";
import { onMount } from 'svelte';
let rows = [];

onMount(async () => {
  const url = 'https://webapiweb.online:8000/get_values';

  try {
    const response = await fetch(url);
    const { data, status } = await response.json();

    if (status === 'success') {
      rows = data
        .map(entry => ({
          name: entry[0],
          score: entry[1]
        }))
        .sort((a, b) => b.score - a.score)  // Sort by score in descending order
        .map((entry, index) => ({
          rank: index + 1,  // Add rank based on position in sorted array
          ...entry
        }));
    } else {
      console.error('API responded with status:', status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});



const columns = [
  {
    key: "name",
    title: "Name",
    value: v => v.name,
    sortable: false,
  },
  {
    key: "score",
    title: "Score",
    value: v => v.score,
    sortable: true,
    filterOptions: rows => {
      // generate groupings of 0-10, 10-20 etc...
      let nums = {};
      rows.forEach(row => {
        let num = Math.floor(row.score / 10);
        if (nums[num] === undefined)
          nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
      });
      // fix order
      nums = Object.entries(nums)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(nums);
    },
    filterValue: v => Math.floor(v.score / 10),
    headerClass: "text-left",
  },
  /*
  {
    key: "card_review",
    title: "Card Review",
    value: v => v.card_review,
    sortable: true,
    filterOptions: rows => {
      // generate groupings of 0-10, 10-20 etc...
      let nums = {};
      rows.forEach(row => {
        let num = Math.floor(row.card_review / 10);
        if (nums[num] === undefined)
          nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
      });
      // fix order
      nums = Object.entries(nums)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(nums);
    },
    filterValue: v => Math.floor(v.card_review / 10),
    headerClass: "text-left",
  },
  {
    key: "card_retention",
    title: "Card Retention",
    value: v => v.card_retention,
    sortable: true,
    filterOptions: rows => {
      // generate groupings of 0-10, 10-20 etc...
      let nums = {};
      rows.forEach(row => {
        let num = Math.floor(row.card_retention / 10);
        if (nums[num] === undefined)
          nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
      });
      // fix order
      nums = Object.entries(nums)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(nums);
    },
    filterValue: v => Math.floor(v.card_retention / 10),
    headerClass: "text-left",
  },
  */
  {
    key: "rank",
    title: "Rank",
    value: v => v.rank,
    sortable: true,
    filterOptions: rows => {
      // generate groupings of 0-10, 10-20 etc...
      let nums = {};
      rows.forEach(row => {
        let num = Math.floor(row.rank / 10);
        if (nums[num] === undefined)
          nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
      });
      // fix order
      nums = Object.entries(nums)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(nums);
    },
    filterValue: v => Math.floor(v.rank / 10),
    headerClass: "text-left",
  },
  

];

</script>
<section class="leaderboard">
<SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>
</section>
<footer>
    <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
</footer>
<style>
    .leaderboard {
        margin-top: 2%;
        align-items: center;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        width: 80%;
        min-height: 70vh;
        margin-left: auto;
        margin-right: auto;
    }



    footer {
            background-color: #0066cc;
            color: white;
            text-align: center;
            padding: 1.5rem;
            margin-top: 2rem;
            border-radius: 0 0 8px 8px;
        }
    </style>