import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   

const Resolution = () => {
  const { projectID } = useParams(); // Get the project ID from the URL parameters

  return (
    <div className="resolution-container">
      <h2>Resolution for Project {projectID}</h2>
      <p className="explanation-text">This section will contain information about the Resolution in your story line.</p>
      {/* Additional content can be added here, such as a list of characters, their descriptions, etc. */}
    </div>
  );
}

export default Resolution;