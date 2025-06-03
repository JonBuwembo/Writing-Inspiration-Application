import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   


const Beginning = () => {
  const { projectID } = useParams(); // Get the project ID from the URL parameters

  return (
    <div className="beginning-container">
      <h2>Beginning of Project {projectID}</h2>
      <p>
        This section contains the beginning of the story for Project {projectID}.
        Here you can add details about the initial setup, characters, and setting.

        This page will also display the chapters that you can munually add 
        within for the beginning portion of your story.
      </p>
      {/* Additional content can be added here */}
    </div>
  );
}

export default Beginning;
// This component will render the content for the beginning section of the project archive based on the project ID from the URL parameters.