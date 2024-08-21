<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - MizukiLearn.com</title>
</head>
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
        
        
        
        .container {
            max-width: 400px;
            margin: auto;
            padding: 2rem;
            background-color: white;
            border-radius: 12px;
            box-shadow: var(--shadow);
        }
        
        h1 {
            color: var(--primary-color);
            text-align: center;
            margin-bottom: 1.5rem;
            font-weight: 600;
        }
        
        form {
            display: flex;
            flex-direction: column;
        }
        
        label {
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #555;
        }
        
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #e1e1e1;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        button {
            background-color: var(--primary-color);
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-weight: 500;
        }
        
        button:hover {
            background-color: #3476c5;
        }
        
        .login-link {
            text-align: center;
            margin-top: 1rem;
        }
        
        .login-link a {
            color: var(--primary-color);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .login-link a:hover {
            color: #2c3e50;
        }
        
        .mascot {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .mascot img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            box-shadow: var(--shadow);
        }
        
        footer {
            background-color: var(--primary-color);
            color: white;
            text-align: center;
            padding: 1rem;
            margin-top: auto;
            font-size: 0.9rem;
        }
    </style>


<script>

    let username = '';
    let email = '';
    let password = '';
    let secret = '';

    
    const handleSignup = async () => {
        try {
            const response = await fetch('https://webapiweb.online:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    secret
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful');
            } else {
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
        }
    };



</script>

<body>

    <div class="container">
        <div class="mascot">
            <img src="../images/mizuki-chan.png" alt="Mizuki-chan">
        </div>
        <h1>Join MizukiLearn</h1>
        <form on:submit|preventDefault={handleSignup}>
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={username} name="username" required placeholder="Choose a username">

            <label for="secret">invite code</label>
            <input type="text" id="secret" bind:value={secret} name="secret" required placeholder="enter invite code">

            <label for="email">Email</label>
            <input type="email" id="email" bind:value={email} name="email" required placeholder="Enter your gmail">

            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password} name="password" required placeholder="Create a password">

            <button type="submit">Sign Up</button>
        </form>
        <div class="login-link">
            <p>Already have an account? <a href="/Login">Log In</a></p>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 MizukiLearn.com. All rights reserved.</p>
    </footer>
</body>
