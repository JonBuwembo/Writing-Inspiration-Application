import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './HomePage.css'
// import '../App.css'
import '../Register.jsx'
import '../Register.css'
import '../LoginPage.jsx'
import TopNav from './TopNav.jsx'
import Sidebar from './Sidebar.jsx'
import PublicPosts from './PublicPosts.jsx'
function HomePage() {

    return (

        <div className="home-page-container">
            <TopNav /> {/* Fixed at the top */}
             {/* Fixed on the left */}
            <div className="main-content-2">
                <Sidebar />
                <PublicPosts /> {/* Dynamic main content */}
            </div>
        </div>
    );
}

export default HomePage;