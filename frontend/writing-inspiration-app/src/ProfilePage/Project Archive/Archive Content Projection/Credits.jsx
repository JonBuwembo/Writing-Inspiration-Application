import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   

const Characters = () => {
  const { projectID } = useParams(); // Get the project ID from the URL parameters

  return (
    <div className="inspiration-container">
      <h2>Inspiration for Project {projectID}</h2>
      <p className="explanation-text">This section will contain information about the what inspired you to write your story.</p>
      {/* Additional content can be added here, such as a list of characters, their descriptions, etc. */}
    </div>
  );
}
export default Characters;
// This component will render the content for the characters section of the project archive based on the project ID from the URL parameters.