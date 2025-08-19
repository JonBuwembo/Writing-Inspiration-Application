// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './LoginPage.css';
import '../RegistrationPage/Register.jsx';
import './LoginPage.jsx';
import supabase from '../config/supabaseClient.js';
import { authService } from '../auth/authService.js';
import { useState, useEffect } from 'react';
import GoogleLoginButtons from './GoogleLoginButtons.jsx';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    //let [newEmails, setCount] = useState(0)
    //const [password, setPassword] = useState("");
    //const [username, setUsername] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function handleOAuthRedirect() {
            const {data: {session}, error } = await supabase.auth.getSession()
            if(error) {
                console.error("OAuth callback error:", error);
                return;
            }

            if (session?.user) {
                window.location.href = "/profile";
            }

        }
        handleOAuthRedirect();
    }, []);


    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await authService.loginWithPassword(formData.email, formData.password);
            // If login is successful, redirect to the home page
            window.location.href = '/profile'; // Redirect to profile page
            return { success: true, user: user };
        } catch (error) {
            alert("Invalid");
            console.error('Login failed:', error);
            // Handle login error (e.g., show an error message to the user)
            return { success: false, error };
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const user = await authService.signInWithGoogle();
            window.location.href = '/profile';
        } catch (error) {
            alert(error.message)
        }
    };

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

                <button type="submit" className="login-btn"> Log In </button>
                

                <div style={{ display: "flex", alignItems: "center", margin: "2px 0" }}>
                    <hr style={{ flex: 1, border: "none", borderTop: "1px solid #9ca1a0" }} />
                    <span style={{ margin: "0 10px", color: "#666" }}> OR </span>
                    <hr style={{ flex: 1, border: "none", borderTop: "1px solid #9ca1a0" }} />
                </div>

                {/* Google sign in */}
             
                <GoogleLoginButtons onLogin={handleGoogleLogin} />
                
                

                <div className="register">
                    <p> Don't have an account? <a href="/Register">Register</a></p>
                </div>
            </form>
        </div>
        </div>
    )
}

export default LoginPage;