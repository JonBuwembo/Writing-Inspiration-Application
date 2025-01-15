import React from 'react';
import './ProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><a id="home-link" href="/home"><FontAwesomeIcon icon={faHouse} className="icon-spacing" />Home</a></li>
                    <li><a id="dashboard" href="/profile"><FontAwesomeIcon icon={faBriefcase} className="icon-spacing"/> My Dashboard</a></li>
                    <li><a id="sign-out" href="/login"> <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon-spacing" /> Sign Out </a></li>
                    <li><a id="chats" href="#"> <FontAwesomeIcon icon={faComment} className='icon-spacing' /> Chats </a></li>
                    <li><a id="settings" href="/settings"> <FontAwesomeIcon icon={faGear} className='icon-spacing' /> Settings </a></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
