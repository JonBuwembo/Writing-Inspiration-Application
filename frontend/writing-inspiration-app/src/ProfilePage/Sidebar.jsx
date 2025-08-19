import React from 'react';
import './ProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import authService from '../auth/authService';
const Sidebar = () => {

    const location = useLocation();

    return (
        <aside className="sidebar">
            <nav>
                <ul className="sidebar-nav">
                    {/* <li>
                        <a id="home-link" href="/home">
                            <i className='fas fa-home' style={{marginRight: "12px"}}></i>
                            Home
                        </a>
                    </li> */}

                    <li><a id="dashboard" href="/profile" className={location.pathname === "/profile" || "/profile/*"? 'active-link-sidebar':''}><FontAwesomeIcon icon={faBriefcase} className="icon-spacing"/>My Dashboard </a></li>
                    <li><a id="sign-out" href="/login" onClick={authService.logoutUser} className={location.pathname === "/login"? 'active-link-sidebar':''}> <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon-spacing" />Sign Out </a></li>
                    <li><a id="chats" href="#" className={location.pathname === "/chats"? 'active-link-sidebar':''}> <FontAwesomeIcon icon={faComment} className='icon-spacing' />Chats </a></li>
                    <li><a id="settings" href="/settings" className={location.pathname === "/settings"? 'active-link-sidebar':''}> <FontAwesomeIcon icon={faGear} className='icon-spacing' />Settings </a></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
