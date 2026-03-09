
import react from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    handleLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({username, password})
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (data.ok) {
               // localStorage.setItem('token', data.token);
               alert("Login successful!");
               navigate('/home');
            }
        }

    return (
        <div>
            <h1>Login</h1>

            <label > Username: </label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label > Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;