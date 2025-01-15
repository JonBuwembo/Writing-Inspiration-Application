import React from 'react';
import './HomePage.css'
import './PublicPosts.jsx'

import { Link } from 'react-router-dom';
import { faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <aside className="sidebar-2">
            <nav>
                <ul>
                    <li><a id="images" href="/home/images"> <FontAwesomeIcon icon={faImage} className="icon-spacing"/> Images</a></li>
                    <li><a id="videos" href="/home/videos"> <FontAwesomeIcon icon={faVideo} className="icon-spacing"/>Videos</a></li>
                    <li><a id="documents" href="/home/documents"> <FontAwesomeIcon icon={faFile} className='icon-spacing' /> Documents </a></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;