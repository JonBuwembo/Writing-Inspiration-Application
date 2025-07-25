// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './LoginPage.css'
import '../RegistrationPage/Register.jsx'
import './LoginPage.jsx'
import supabase from '../config/supabaseClient.js';
import { authService } from '../auth/authService.js';
import { useState } from 'react';

function LoginPage() {
    //let [newEmails, setCount] = useState(0)
    //const [password, setPassword] = useState("");
    //const [username, setUsername] = useState("");

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await authService.loginUser(
                formData.email, // Email input)
                formData.password)

            // If login is successful, redirect to the home page
            window.location.href = '/home'; // Redirect to home page
        } catch (error) {
            alert(error.message);
            console.error('Login failed:', error);
            // Handle login error (e.g., show an error message to the user)
        }
    }

    return (
        <div className="page">
        <div className='login-page-container'>
            <form onSubmit={handleLogin}>

                <h3 style={{ fontSize: '25px'}}> 
                    Login to your account!
                </h3>

                <p>  Stay creative and updated on current inspiration </p>

                <div className="input-field">
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>

                <div className="input-field">
                    <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                </div>

                {/* logic needs to be implemented for 'Remember me' button */}

                <div className="checkbox-field">
                    <input type="checkbox" id="remember" className="checkbox" />
                    <p className='remember-me'> Remember me</p>
                </div>

                {/* Logic needs to be written for 'forgot password' button */}
                <div className='input-field'>
                    <div className="forgot-password">
                        <a href="#">Forgot password? </a>
                    </div>
                </div>

                {/* When user logs in, they are sent to the home page of Inspira */}
                <button type="submit" className="login-btn"> Log In </button>

                 <div id="g_id_onload"
                    data-client_id="173883313635-c3qhml5k8th9u5pflu7c1ea4lpbqen2q.apps.googleusercontent.com"
                    data-login_uri="http://localhost:5173/auth/google/callback"
                    data-auto_prompt="false">
                </div>
                
                <div className="g_id_signin"
                    data-type="standard"
                    data-size="large"
                    data-theme="outline"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div>

                <script src="https://accounts.google.com/gsi/client" async defer></script>

                <div className="register">
                    <p> Don't have an account? <a href="/Register">Register</a></p>
                </div>
            </form>
        </div>
        </div>
    )
}

export default LoginPage;