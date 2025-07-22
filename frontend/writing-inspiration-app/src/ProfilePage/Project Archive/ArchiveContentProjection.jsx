import React from 'react';
import './archive.css';
import {Routes, Route, useParams} from 'react-router-dom';
import Summary from './Archive Content Projection/Summary.jsx';
import Characters from './Archive Content Projection/Characters.jsx';
import Overview from './Archive Content Projection/Overview.jsx';
import SettingsStory from './Archive Content Projection/Settings-Story.jsx';
import Credits from './Archive Content Projection/Credits.jsx';
import CharacterDetail from './Archive Content Projection/Singular Components/A_Character.jsx';

function ArchiveContentProjection({className, style}) {  
   
    
    return (

        
            
            
            <div className={className} style={style} >
                <Routes>
                    <Route path="overview" element={<Overview />} />
                    <Route path="Summary" element={<Summary />} />
                    <Route path="characters" element={<Characters />} />
                    <Route path="characters/:characterId" element={<CharacterDetail />} />
                    <Route path="credits" element={<Credits />} />
                    
                </Routes>

                
            </div>
            
        

            
    );
}

    export default ArchiveContentProjection;
    // This component will render the content for each section of the project archive based on the project ID from the URL parameters.