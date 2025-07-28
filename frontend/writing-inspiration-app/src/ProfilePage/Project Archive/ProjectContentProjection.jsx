import React from 'react';
import './archive.css';
import {Routes, Route, useParams} from 'react-router-dom';
import Summary from './Archive Content Projection/Summary.jsx';
import Characters from './Archive Content Projection/Characters.jsx';
import Overview from './Archive Content Projection/Overview.jsx';
import SettingsStory from './Archive Content Projection/Settings-Story.jsx';
import Credits from './Archive Content Projection/Credits.jsx';
import CharacterDetail from './Archive Content Projection/Singular Components/A_Character.jsx';
import NoteEditor from './Archive Content Projection/NoteEditor/NoteEditor.jsx';
function ProjectContentProjection({className, style}) {  
   
    
    return (

        
            
            
            <div className={className} style={style} >
                <Routes>
                    {/* Inside these different categories on the sidebar, we go
                        straight to their notes.
                    */}

                    {/* Unsorted Note */}
                    <Route path="/unsorted/note/:noteId" element={<NoteEditor />} />
        
                    {/* Section Notes */}
                    <Route path="sections/notes/:noteId" element={<NoteEditor />} />

                    {/* Section Notes */}
                    <Route path="overview/:noteId" element={<NoteEditor />} />
                    <Route path="Summary/:noteId" element={<NoteEditor />} />
                    <Route path="timeline/:noteId" element={<NoteEditor />} />

                    {/* Orphan Notes */}
                     <Route path="orphan-notes/:noteId" element={<NoteEditor />} />
                    <Route path="credits" element={<Credits />} />
                    
                    
                    {/* Character Notes */}
                    <Route path="characters/notes/:noteId" element={<NoteEditor />} />

                    {/* Plot Threads*/}
                    <Route path="plot-threads/notes/:noteId" element={<NoteEditor />} />
                  
                </Routes>

                
            </div>
            
        

            
    );
}

    export default ProjectContentProjection;
    // This component will render the content for each section of the project archive based on the project ID from the URL parameters.