
<script>
</script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MizukiLearn</title>
    <style>
        
       
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .hero {
            text-align: center;
            padding: 4rem 0;
        }
        .hero h1 {
            font-size: 2.5rem;
            color: #0066cc;
        }
        .cta-button {
            display: inline-block;
            background-color: #0066cc;
            color: white;
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 1rem;
        }
        .features {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        .feature {
            background-color: white;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem;
            width: calc(33% - 2rem);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .mascot {
            text-align: center;
            margin-top: 2rem;
        }
        .mascot img {
            max-width: 200px;
            border-radius: 50%;
        }
        footer {
            background-color: #0066cc;
            color: white;
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
        }
    </style>
</head>
<body>

    <div class="container">
        <section class="hero" id="home">
            <h1>Welcome to MizukiLearn.com</h1>
            <p>Embark on a journey of knowledge with Mizuki-chan as your guide!</p>
            <a href="/Login" class="cta-button">Start Learning</a>
        </section>

        <section class="features">
            <div class="feature">
                <h2>Leaderboard</h2>
                <p>Compete with friends and track your progress in real-time!</p>
            </div>
            <div class="feature">
                <h2>Quizzes/ Games</h2>
                <p>Coming Soon! </p>
            </div>
            <div class="feature">
                <h2>Profiles and Badges</h2>
                <p>Coming Soon! </p>
            </div>
        </section>

        <section class="mascot">
            <img src="images/mizuki-chan.png" alt="Mizuki-chan">
            <h2>Meet Mizuki-chan</h2>
            <p>Your resilient and empathetic guide on this learning adventure!</p>
        </section>
    </div>

    <footer>
        <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
    </footer>
</body>

