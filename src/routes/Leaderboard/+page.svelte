<script>
import SvelteTable from "svelte-table";

const rows = [
  { "name": "Queen", "score": 440, "card_review": 66, "card_retention": 95, "rank": 1 },
  { "name": "Albert", "score": 420, "card_review": 63, "card_retention": 94, "rank": 2 },
  { "name": "Elvis", "score": 410, "card_review": 60, "card_retention": 91, "rank": 3 },
  { "name": "Charles", "score": 400, "card_review": 59, "card_retention": 92, "rank": 4 },
  { "name": "Paul", "score": 390, "card_review": 54, "card_retention": 88, "rank": 5 },
  { "name": "Christopher", "score": 380, "card_review": 55, "card_retention": 89, "rank": 6 },
  { "name": "Margaret", "score": 360, "card_review": 58, "card_retention": 90, "rank": 7 },
  { "name": "John F.", "score": 350, "card_review": 53, "card_retention": 88, "rank": 8 },
  { "name": "Muhammad", "score": 340, "card_review": 62, "card_retention": 91, "rank": 9 },
  { "name": "George", "score": 330, "card_review": 50, "card_retention": 87, "rank": 10 },
  { "name": "Mahatma", "score": 320, "card_review": 64, "card_retention": 93, "rank": 11 },
  { "name": "Nelson", "score": 310, "card_review": 61, "card_retention": 92, "rank": 12 },
  { "name": "Winston", "score": 290, "card_review": 56, "card_retention": 89, "rank": 13 },
  { "name": "Martin Luther", "score": 280, "card_review": 47, "card_retention": 83, "rank": 14 },
  { "name": "Bill", "score": 270, "card_review": 49, "card_retention": 86, "rank": 15 },
  { "name": "Mother", "score": 300, "card_review": 68, "card_retention": 95, "rank": 16 },
  { "name": "Abraham", "score": 200, "card_review": 57, "card_retention": 90, "rank": 17 },
  { "name": "Marilyn", "score": 100, "card_review": 42, "card_retention": 85, "rank": 18 },
  

];


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
        margin-left: auto;
        margin-right: auto;
    }

    footer {
            background-color: #0066cc;
            color: white;
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
            border-radius: 0 0 8px 8px;
        }
    </style>