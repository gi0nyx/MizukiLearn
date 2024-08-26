<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - MizukiLearn.com</title>
    <style>
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

.profile-container {
    max-width: 1200px;
    margin: 2rem auto;
    background-color: white;
    border-radius: 12px;
    box-shadow: var(--shadow);
    padding: 2.5rem;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
}

.profile-avatar {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 1.5rem;
    box-shadow: var(--shadow);
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 1%;
    object-fit: cover;
}

.profile-header h1 {
    color: var(--primary-color);
    font-weight: 600;
    margin: 0;
}

.profile-info {
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
}

.profile-info-item {
    align-items: center;
    margin: 0 1.5rem;
}

.profile-info-item img {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
}

.profile-info-item span {
    font-weight: 500;
}

.profile-sections {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
}

.profile-section {
    background-color: #f5f7fa;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--shadow);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.profile-section h2 {
    color: var(--primary-color);
    margin-top: 0;
    font-size: 1.5rem;
}

.profile-section p {
    margin-bottom: 1.5rem;
}

.profile-section a {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: background-color 0.3s ease;
}

.profile-section a:hover {
    background-color: #3476c5;
}

.profile-badges {
    background-color: #f5f7fa;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2.5rem;
}

.profile-badges-item {
    display: flex;
    align-items: center;
    margin: 0 1.5rem;
}

.profile-badges-item img {
    width: 32px;
    height: 32px;
    margin-right: 0.5rem;
}

.profile-badges-item span {
    font-weight: 500;
}

footer {
    background-color: var(--primary-color);
    color: white;
    text-align: center;
    padding: 1.25rem;
    margin-top: auto;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .profile-container {
        margin: 1rem;
        padding: 1.5rem;
    }

    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .profile-avatar {
        margin-right: 0;
        margin-bottom: 1rem;
    }

    .profile-sections {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .profile-badges {
        flex-direction: column;
        padding: 1.5rem;
    }

    .profile-badges-item {
        margin: 0.5rem 0;
    }

    .profile-section {
        padding: 1.5rem;
    }

    .profile-section h2 {
        font-size: 1.2rem;
    }

    .profile-section a {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
}
    </style>
</head>


<script lang="ts">
    import { onMount } from 'svelte';
    import Badges from './badges.svelte';
    import { userData} from '../../../stores/userStore';

    // Define an interface for the user data structure

  let user;
  userData.subscribe(value => {
    user = value;
  });


    let badges = [
        { name: '5 days badge', achieved: true, imageUrl: '../images/5_days.png' },
        { name: '10 days badge', achieved: true, imageUrl: '/images/10_days.png' },
        { name: '30 days badge', achieved: false, imageUrl: '/images/30_days.png' },
    ];
</script>



<body>

    <div class="profile-container">
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="../images/mizuki-chan.png" alt="Mizuki-chan">
            </div>
            {#if Object.keys(user).length > 0}
            <h1>Welcome, {user.name || 'Name'}</h1>
            {:else}
        <p>Loading...</p>
        {/if}
        </div>

        <div class="profile-info">
            <div class="profile-info-item">
                <span></span>
            </div>
            {#if badges.length > 0}
            <Badges {badges} />
        {:else}
            <p>Loading badges...</p>
        {/if}
        </div>

        <div class="profile-sections">
            <div class="profile-section">
                <h2>Quizzes</h2>
                <p>Coming Soon</p>
                <a href="#quizzes" class="profile-link">Take a Quiz</a>
            </div>
            <div class="profile-section">
                <h2>Leaderboard</h2>
                <p></p>
                <a href="/protected/user/Leaderboard" class="profile-link">View Leaderboard</a>
            </div>
            <div class="profile-section">
                <h2>Games</h2>
                <p>Coming Soon</p>
                <a href="#games" class="profile-link">Play Games</a>
            </div>
            <div class="profile-section">
                <h2>Learn from Mizuki-chan</h2>
                <p> Coming soon </p>
                <a href="#learn" class="profile-link">Start Learning</a>
            </div>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
    </footer>
</body>

