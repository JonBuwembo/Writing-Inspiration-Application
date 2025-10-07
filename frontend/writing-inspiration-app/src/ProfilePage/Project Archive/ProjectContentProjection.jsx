import React from 'react';
import './archive.css';
import {Routes, Route, useOutletContext, useParams} from 'react-router-dom';
import './maincontent.css';
import Summary from './Archive Content Projection/Summary.jsx';
import Characters from './Archive Content Projection/Characters.jsx';
import Overview from './Archive Content Projection/Overview.jsx';
import SettingsStory from './Archive Content Projection/Settings-Story.jsx';
import Credits from './Archive Content Projection/Credits.jsx';
import CharacterDetail from './Archive Content Projection/Singular Components/A_Character.jsx';
import NoteEditor from './Archive Content Projection/NoteEditor/NoteEditor.jsx';
import AIWritingAssistant from './AIWritingAssistant.jsx';
import { Outlet } from 'react-router-dom';
function ProjectContentProjection() {  

      const { notes, testProp, onChange, onAddHashTag, isSectionNote } = useOutletContext();
    
    
    return (

        
            
           <div className="archive-content-projection-container">
            <Routes>
                <Route path="unsorted/note/:noteId" element={<NoteEditor {...{ notes, testProp, onChange, onAddHashTag, isSectionNote }} />} />
                <Route path="note/:noteId" element={<NoteEditor {...{ notes, testProp, onChange, onAddHashTag, isSectionNote }} />} />
                <Route path="overview/:noteId" element={<Overview {...{ notes, testProp, onChange, onAddHashTag, isSectionNote }} />} />

                <Route 
                    path="ai-writing-assistant" 
                    element={<AIWritingAssistant {...{ notes, testProp, onChange, onAddHashTag, isSectionNote }} />} 
                    />
                <Route path="credits" element={<Credits />} />
            </Routes>
            
           </div>

            
    );
}

    export default ProjectContentProjection;
    // This component will render the content for each section of the project archive based on the project ID from the URL parameters.