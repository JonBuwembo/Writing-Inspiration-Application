// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './LoginPage.css';
import '../RegistrationPage/Register.jsx';
// removed self-import './LoginPage.jsx' which caused a circular import and could prevent the module from initializing
import supabase from '../config/supabaseClient.js';
import { authService } from '../auth/authService.js';
import { useState, useEffect } from 'react';
import GoogleLoginButtons from './GoogleLoginButtons.jsx';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


function LoginPage() {
    //let [newEmails, setCount] = useState(0)
    //const [password, setPassword] = useState("");
    //const [username, setUsername] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log('LoginPage mounted');
        async function handleOAuthRedirect() {
            const {data: {session}, error } = await supabase.auth.getSession()
            if (error) {
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
    const [loginError, setLoginError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginError(null); // clear previous errors
        console.log("Login form submitted:", formData);

        try {
            const user = await authService.loginWithPassword(formData.email, formData.password);
            console.log("loginWithPassword returned:", user);

            if (user) {
                console.log('Login successful, navigating to profile');
                window.location.href = '/profile'; // Redirect to profile page
                return { success: true, user };
            } else {
                console.warn('loginWithPassword returned falsy user:', user);
                return { success: false };
            }
        } catch (error) {
            const diag = error?.diagnostics;
            let message = error?.message || String(error);
            if (diag) {
                // friendly guidance for network/CORS
                if (diag.isCorsLike) {
                    message = `Network/CORS issue: ${diag.message} — check proxy or SUPABASE_URL (online: ${diag.online})`;
                } else {
                    message = `${diag.message} (online: ${diag.online})`;
                }
            }
            console.error('Login failed:', error, 'diagnostics:', diag || null);
            setLoginError(message);
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
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                </div>

                {/* logic needs to be implemented for 'Remember me' button */}

                <div className="checkbox-field">
                    <input type="checkbox" id="remember" className="checkbox" />
                    <p className='remember-me'> Remember me</p>
                </div>

                
                <div className='input-field'>
                    <div className="forgot-password">
                        <a href="#">Forgot password? </a>
                    </div>
                </div>

                <button type="submit" className="login-btn"> Log In </button>
                
                {/* 
                
                <div style={{ display: "flex", alignItems: "center", margin: "2px 0" }}>
                    <hr style={{ flex: 1, border: "none", borderTop: "1px solid #9ca1a0" }} />
                    <span style={{ margin:  "0 10px", color: "#666" }}> OR </span>
                    <hr style={{ flex: 1, border: "none", borderTop: "1px solid #9ca1a0" }} />
                </div>

              
             
                <GoogleLoginButtons /> 

                */}
                
                 
               

                <div className="register">
                    <p> Don't have an account? <a href="/Register">Register</a></p>
                </div>
            </form>

            {loginError && (
                <div style={{ marginTop: '16px', padding: '12px', background: '#ffe6e6', color: '#800', borderRadius: '6px' }}>
                    <strong>Login error:</strong>
                    <div style={{ marginTop: '8px' }}>{loginError}</div>
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#600' }}>
                        If this looks like a network/CORS issue, open DevTools → Network and look for the login request (path contains 'auth' or 'token').
                        Check the request's Response and Console for CORS messages ("Access-Control-Allow-Origin").
                    </div>
                </div>
            )}


                {/* <div style={{ marginTop: '20px' }}>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={['google']}
                        redirectTo={`${window.location.origin}/profile`}
                    />
                </div>  */}
                
            </div> 
        </div> 
    )
}

export default LoginPage;