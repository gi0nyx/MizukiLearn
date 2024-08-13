<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/About">About</a></li>
            <li><a href="/Leaderboard">Leaderboard</a></li>
        </ul>
    </nav>
</header>
<slot />



<style>

header {
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 1rem;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: space-around;
        }
        nav ul li a {
            text-decoration: none;
            color: #0066cc;
            font-weight: bold;
        }
:global(body) {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #e6f2ff, #b3d9ff);
            color: #333;
        }
        
</style>
