import React from "react";
import "./ProjectSections.css";
import { useParams } from "react-router-dom";   

const SettingsStory = () => {  
    const { projectID } = useParams(); // Get the project ID from the URL parameters

    return (
        <div className="settings-story-container">
            <h2>Settings for Project {projectID}</h2>
            <p className="explanation-text">This section will contain information about the settings in your project.</p>
            {/* Additional content can be added here, such as a list of settings, their descriptions, etc. */}
        </div>
    );
}

export default SettingsStory;
// This component will render the content for the settings section of the project archive based on the project ID from the URL parameters.