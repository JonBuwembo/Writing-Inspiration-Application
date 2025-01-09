import React from 'react';
import './ProfilePage.css'
import { Link } from 'react-router-dom';
import './ProfilePage.jsx'
import './ProfilePage.css'
import './MainContent'

const TopNav = () => {
  return (
    <div className="top-nav-container">
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="search-container">
          <input type="text" placeholder="Search Your Dashboard ..." />
        </div>
        <div className="user-info">
          <span>Jonathan Buwembo</span>
        </div>
      </header>

      {/* Sub-Navigation */}
      <nav className="sub-nav">
        <ul>
          <li><Link to="/profile/overview">Overview</Link></li>
          <li><Link to="/profile/myprojects">MyProjects</Link></li>
          <li><Link to="/profile/mypictures">MyPictures</Link></li>
          <li><Link to="/profile/myvideos">MyVideos</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default TopNav;
