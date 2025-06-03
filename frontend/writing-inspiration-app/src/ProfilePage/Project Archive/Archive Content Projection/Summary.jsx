import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   

const Summary = () => {
    const { projectID } = useParams(); // Get the project ID from the URL parameters
    
    return (
        <div className="summary-container">
            <h2>Climax for Project {projectID}</h2>
            <p>This section will contain information about the summary of your story line.</p>
            {/* Additional content can be added here, such as a description of the climax, key events, etc. */}
        </div>
    );
}

export default Summary;
// This component will render the content for the summary section of the project archive based on the project ID from the URL parameters.