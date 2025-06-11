import React from 'react';
import './archive.css';
import {Routes, Route, useParams} from 'react-router-dom';

function SidebarArchive() {
  const {projectID} = useParams(); // Get the project ID from the URL parameters

  return (
    <div className="sidebarArchive-container">

        <h2 className="project-title-display">Project {projectID} Archive</h2>

        <hr></hr>

        <div className="section-label"> Content </div>

        
        <nav className="sidebar-nav-author">
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