import React from 'react';
import './archive.css';
import {Routes, Route, useParams} from 'react-router-dom';

function SidebarArchive() {
  const {projectID} = useParams(); // Get the project ID from the URL parameters

  return (
    <div className="SidebarArchive-container">
        <h2>Project {projectID} Archive</h2>
        <nav className="sidebar-nav">
            <ul>
                <li><a href={`/projectarchive/${projectID}/summary`}>Summary</a></li>
                <li><a href={`/projectarchive/${projectID}/characters`}>Characters</a></li>
                <li><a href={`/projectarchive/${projectID}/settings-story`}>Settings/Story</a></li>
                <li><a href={`/projectarchive/${projectID}/beginning`}>Beginning</a></li>
                <li><a href={`/projectarchive/${projectID}/climax`}>Climax</a></li>
                <li><a href={`/projectarchive/${projectID}/resolution`}>Resolution</a></li>
                <li><a href={`/projectarchive/${projectID}/inspiration-blurb`}>Inspiration Blurb</a></li>
            </ul>
        </nav>
    </div>
  );
}

export default SidebarArchive;