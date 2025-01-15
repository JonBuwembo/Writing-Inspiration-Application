// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './LoginPage.css'
import '../RegistrationPage/Register.jsx'
import './LoginPage.jsx'

function LoginPage() {
    //let [newEmails, setCount] = useState(0)
    //const [password, setPassword] = useState("");
    //const [username, setUsername] = useState("");

    return (
        <div>
            <form action="#">
                <h2> 
                    Login 
                    
                    <p> Stay creative and updated on current inspiration </p>
                </h2>

                <div className="input-field">
                    <input type="text" placeholder="Email" required />
                </div>

                <div className="input-field">
                    <input type="password" placeholder="Password" required />
                </div>

                {/* logic needs to be implemented for 'Remember me' button */}

                <div className="textbox-field">
                    <input type="checkbox" id="remember" className="textbox" />
                    <p className='remember-me'> Remember me</p>
                </div>

                {/* Logic needs to be written for 'forgot password' button */}
                <div className='input-field'>
                    <div className="forgot-password">
                        <a href="#">Forgot password? </a>
                    </div>
                </div>

                {/* When user logs in, they are sent to the home page of Inspira */}
                <button type="submit"> Log In </button>

                <div className="register">
                    <p> Don't have an account? <a href="/Register">Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;