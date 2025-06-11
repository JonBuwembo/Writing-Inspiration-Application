import React from 'react';
import './archive.css';
import {useParams} from 'react-router-dom';
import SidebarArchive from './SidebarArchive.jsx'; // Import the sidebar component for the archive page
import ArchiveContentProjection from './ArchiveContentProjection.jsx';
function ArchivePage() {

  const {projectID} = useParams(); //paramater in the URL
  // prokectID is the ID of the project we are viewing
  // This will be used to fetch the project data from the server or local storage to display specific information about the project.

  return (
    <div className="archive-container">

      <SidebarArchive/>
      <ArchiveContentProjection projectID={projectID} />
      
      {/* Additional content can be added here */}
    </div>
  );
}

export default ArchivePage;