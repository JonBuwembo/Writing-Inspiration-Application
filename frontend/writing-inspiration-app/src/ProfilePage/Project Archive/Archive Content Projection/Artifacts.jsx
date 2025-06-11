import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   

const Artifacts = () => {
    const { projectID } = useParams(); // Get the project ID from the URL parameters
    
    return (
        <div className="artifacts-container">
            <h2>Artifacts for Project {projectID}</h2>
            <p className="explanation-text">This section will contain information about the artifacts or physical items in your story line.</p>
            {/* Additional content can be added here, such as a list of artifacts, their descriptions, etc. */}
        </div>
    );
}

export default Artifacts;
// This component will render the content for the artifacts section of the project archive based on the project ID from the URL parameters.