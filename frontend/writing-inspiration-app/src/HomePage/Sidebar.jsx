import React from 'react';
import './HomePage.css'
import './PublicPosts.jsx'

import { Link } from 'react-router-dom';
import { faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <aside className="sidebar-2">
            <nav>
                <ul>
                    <li><Link to="/home/images"> <FontAwesomeIcon icon={faImage} className="icon-spacing"/> Images</Link></li>
                    <li><Link to="/home/videos"> <FontAwesomeIcon icon={faVideo} className="icon-spacing"/>Videos</Link></li>
                    <li><Link to="/home/documents"> <FontAwesomeIcon icon={faFile} className='icon-spacing' /> Documents </Link></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;