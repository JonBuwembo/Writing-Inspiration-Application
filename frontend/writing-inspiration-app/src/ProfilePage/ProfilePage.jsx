import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './ProfilePage.css'
import '../RegistrationPage/Register.jsx'
import '../LoginPage/LoginPage.jsx'
import Sidebar from './Sidebar.jsx'
import TopNav from './TopNav.jsx'
import MainContent from './MainContent.jsx'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
function ProfilePage() {
    //let [newEmails, setCount] = useState(0)

    return (
        //might have to integrate all these linked sections as their own components.

        //FOR NOW don't worry about Followed Artists/Authors, music, text collection sections
        //Just have sections of all your uploaded content: Videos, Documents, Music

        <div className="profile-page-container">
            <Sidebar />
            <div className="content-wrapper">
                <TopNav />
                <MainContent />
            </div>
        </div>


    )
}

export default ProfilePage