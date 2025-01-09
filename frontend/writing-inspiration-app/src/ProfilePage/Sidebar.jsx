import React from 'react';
import './ProfilePage.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/profile">My Dashboard</a></li>
          <li><a href="/login"> Sign Out </a></li>
          <li><a href="#"> Chats </a></li>
          <li><a href="/settings"> Settings </a></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
