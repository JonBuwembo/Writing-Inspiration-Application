import React, {useState} from 'react';
import './archive.css';
import {useParams} from 'react-router-dom';
import SidebarArchive from './SidebarProject.jsx'; // Import the sidebar component for the archive page
import ArchiveContentProjection from './ArchiveContentProjection.jsx';
import './maincontent.css';

function ArchivePage() {

  const {projectID} = useParams(); //paramater in the URL
  const [sidebarWidth, setSidebarWidth] = useState(350);

  // projectID is the ID of the project we are viewing
  // This will be used to fetch the project data from the server or local storage to display specific information about the project.

  return (
    <div className="archive-container">

      {/* 
         Objective: have Maincontent adjust as sidebar grows.  
         We lift the sidebarWidth adjustment variable up to the parent component that interfaces the main content 
         and the sidebar component.
         Then we pass sidebarWidth and its changing-state-var as a prop into both components for manipulation.
         The main content has its width adjusted according to how the user adjusts the sidebar.
      */}
      <SidebarArchive
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        projectID = {projectID}
      />

      <ArchiveContentProjection 
        className="archive-content-projection-container"
        style={{ 
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.2s ease-out'
        }}
        projectID={projectID} 
        
      />

    </div>
  );
}

export default ArchivePage;