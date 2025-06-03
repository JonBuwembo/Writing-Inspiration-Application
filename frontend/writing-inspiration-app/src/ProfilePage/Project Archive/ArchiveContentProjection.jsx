import React from 'react';
import './archive.css';
import {Routes, Route, useParams} from 'react-router-dom';
import Beginning from './Archive Content Projection/Beginning.jsx';
import Climax from './Archive Content Projection/Climax.jsx';
import Resolution from './Archive Content Projection/Resolution.jsx';
import Summary from './Archive Content Projection/Summary.jsx';
import Characters from './Archive Content Projection/Characters.jsx';
import SettingsStory from './Archive Content Projection/Settings-Story.jsx';
import InspirationBlurb from './Archive Content Projection/Inspiration-Blurb.jsx';
import Artifacts from './Archive Content Projection/Artifacts.jsx';
import Symbols from './Archive Content Projection/Symbols.jsx';

function ArchiveContentProjection() {  
    const {projectID} = useParams(); // Get the project ID from the URL parameters
    
    return (
        <div className="ArchiveContentProjection-container">
        <Routes>
            <Route path="summary" element={<Summary />} />
            <Route path="artifacts" element={<Artifacts/>} />
            <Route path="characters" element={<Characters />} />
            <Route path="symbols" element={<Symbols />} />
            <Route path="settings-story" element={<SettingsStory />} />
            <Route path="beginning" element={<Beginning />} /> 
            <Route path="climax" element={<Climax />} /> 
            <Route path="resolution" element={<Resolution />} /> 
            <Route path="inspiration-blurb" element={<InspirationBlurb />} /> 
        </Routes>
        </div>

        
    );
    }
export default ArchiveContentProjection;
// This component will render the content for each section of the project archive based on the project ID from the URL parameters.