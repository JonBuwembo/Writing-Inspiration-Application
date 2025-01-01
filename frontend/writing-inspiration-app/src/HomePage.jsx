import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './HomePage.css'
import './App.css'
import './Register.jsx'
import './Register.css'
import './LoginPage.jsx'
function HomePage(){

    return (
        <div>
           
            <nav>
                <a href="/home"> Home </a>
                <a href="/settings"> Settings </a>
                <a href="/profile"> Profile Icon </a> 
            </nav>
        </div>
    );
}

export default HomePage;