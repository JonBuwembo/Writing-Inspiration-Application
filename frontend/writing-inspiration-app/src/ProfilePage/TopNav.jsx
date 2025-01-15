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
          <input type="text" placeholder=" Search Your Dashboard ...      " />
        </div>

        <div className="options-wrapper-top-profile">

          <ul>
            <li>
              <a href="/upload"> <button>Upload</button> </a>
            </li>
          </ul>

          <div className="user-info">
            <div className='vertical'> </div>
            <div className='font-welcome'> Welcome Jonathan Buwembo!</div>
          </div>

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