import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './SidebarProject.css';
import './maincontent.css';
import CollapsibleSection from './CollapsibleSection';
// import NoteListItem from './NoteListItem';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function SidebarProject({ sidebarWidth, resetNotes, setSidebarWidth, addNewNote, hardcodedHashTags, notes, onAddHashTag }) {
  const [isResizing, setIsResizing] = useState(false);
  const sidebarReference = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Project Type");

  const { projectID } = useParams();
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('projects');
    if (saved) {
      const projects = JSON.parse(saved);
      const project = projects.find(p => String(p.id) === String(projectID));
      setProjectName(project?.name || 'Untitled');
    }
  }, [projectID]);


  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

 

  // const realMetrics = {
  //   sections: sections.length,
  //   orphanNotes: orphanNotes.length,
  //   plotThreads: notes?.filter(n => n.hashTags?.some(t => t.tag.toLowerCase() === '#plot-threads')).length || 0,
  //   characters: notes?.filter(n => n.hashTags?.some(t => t.tag.toLowerCase() === '#characters')).length || 0,
  //   themes: notes?.filter(n => n.hashTags?.some(t => t.tag.toLowerCase() === '#themes')).length || 0,
  // };


  // Section handling
const category = useMemo(() => {
  const result = {
    section: [],
    orphannotes: [],
    plotthreads: [],
    characters: [],
  };

  notes?.forEach(note => {
    const sectionKey = note.section?.toLowerCase();
    if (sectionKey && result[sectionKey]) {
      result[sectionKey].push(note);
    } else {
      result.orphannotes.push(note); // fallback if note has no recognized section
    }
  });

  return result;
}, [notes]);

 

    // Function to handle adding tags from sidebar
  // const handleAddSection = (sectionName) => {
  //   // onAddHashTag(`#${sectionName}`);
   
  // };

  const startResizing = useCallback((event) => {
    setIsResizing(true);
    document.body.classList.add('resizing-active');
    document.body.style.userSelect = 'none';
    event.preventDefault();
  }, []);

  const resize = useCallback((event) => {
    if (isResizing && sidebarReference.current) {
      const newWidth = event.clientX - sidebarReference.current.getBoundingClientRect().left;
      setSidebarWidth(Math.max(350, Math.min(430, newWidth)));
    }
  }, [isResizing]);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    document.body.classList.remove('resizing-active');
    document.body.style.userSelect = '';
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (isResizing && sidebarReference.current) {
      const newWidth = event.touches[0].clientX - sidebarReference.current.getBoundingClientRect().left;
      setSidebarWidth(Math.max(350, Math.min(430, newWidth)));
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResizing);
      return () => {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResizing);
      };
    }
  }, [isResizing, resize, stopResizing]);


  const handleSearchPopup = () => {
      //will handle search popup to search for users content.
  };

   const metrics = {
    section: category.section.length,
    orphanNote: category.orphannotes.length,
    plotThread: category.plotthreads.length,
    character: category.characters.length,
    theme: 4,
  };
 

  return (
    <div
      className="sidebarArchive-container"
      ref={sidebarReference}
      style={{ width: `${sidebarWidth}px` }}
    >
      <h2 className="project-title-display">{projectName}</h2>
     
     <div className='spacing'>
           

           <button onClick={resetNotes}>Reset Me (For Testing) </button>

          
          <div 
            className="search-btn" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            
            onClick={handleSearchPopup}
          > 
            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/search--v1.png" alt="search--v1"/>
            Search
          </div>

          <Link 
            to={'/profile/overview'}
            className='link-to-dashboard'

            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'

            }}

          >

            <img width="20" height="20" src="https://img.icons8.com/ios/50/briefcase.png" alt="briefcase"/>
            MyDashboard
          
          </Link> 

     </div>


      <div className="project-type-dropdown-container">
        <label htmlFor="project-type-dropdown">Project Type: </label>
        <div
          className={`custom-select ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          id="custom-project-type"
        >
          {selected}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="custom-options">
                {['Novel', 'Short Story', 'Screenplay', 'Poetry', 'Journalism', 'Other'].map(option => (
                  <div key={option} onClick={() => handleOptionClick(option)}>{option}</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
      <button className="add-content-btn" 
      onClick={() => {
            console.log("Add content button clicked");
            addNewNote();
      }}>
        + Add Content
      </button>

      <div className="sidebar-options-container">
        <ul className="metric-group">
          <li>
            <CollapsibleSection title="Navigation">
              <ul className="metric-group">
                <li><Link to={`/project/${projectName}/overview/`}>Overview</Link></li>
                <li><Link to={`/project/${projectName}/timeline/`}>Timeline</Link></li>
                <li><Link to={`/project/${projectName}/summary/`}>Summary</Link></li>

                <CollapsibleSection title={`Sections (${metrics.section})`}>
                  {/* <li><Link to={`/project/${projectName}/section1`}>Section 1</Link></li>
                  <li><Link to={`/project/${projectName}/section2`}>Section 2</Link></li> */}

                  {/* Testing */}
                  {category.section?.map(note => {
                    console.log("Linking to:", `/project/${projectID}/note/${note.id}`);
                    

                    return (
                      <li key={note.id}>
                        <Link to={`/project/${projectID}/note/${note.id}`}>
                          {note.title || 'Untitled Note'}
                        </Link>
                      </li>
                    );
                    
                    
                  })}

                  {/* <li>
                    <button 
                      className="add-subcontent-btn" 
                      onClick={() => addNewNote()}
                    >
                    + Add Section Note
                    </button>
                  </li> */}



                  

                </CollapsibleSection>
                <CollapsibleSection title={`Orphan Notes (${metrics.orphanNote})`}>
                  {/* <li><Link to={`/project/${projectName}/orphan-note1`}>Orphan Note 1</Link></li>
                  <li><Link to={`/project/${projectName}/orphan-note2`}>Orphan Note 2</Link></li> */}

                   {category.orphannotes.map(note => {
                    console.log("Linking to:", `/project/${projectID}/note/${note.id}`);
                    

                    return (
                      <li key={note.id}>
                        
                        <Link to={`/project/${projectID}/note/${note.id}`}>
                          {note.title || 'Untitled Note'}
                        </Link>
                      </li>
                    );
                    
                    
                  })}

                  

                </CollapsibleSection>
                <CollapsibleSection title={`Plot Threads (${metrics.plotThread})`}>
                  <li><Link to={`/project/${projectName}/plot-thread1`}>Plot Thread 1</Link></li>
                  <li><Link to={`/project/${projectName}/plot-thread2`}>Plot Thread 2</Link></li>

                      {category.plotthreads.map(note => {
                        console.log("Linking to:", `/project/${projectID}/note/${note.id}`);
                        

                        return (
                          <li key={note.id}>
                            <Link to={`/project/${projectID}/note/${note.id}`}>
                              {note.title || 'Untitled Note'}
                            </Link>
                          </li>
                        );
                      
                      
                      })}
                  
                </CollapsibleSection>
              </ul>
            </CollapsibleSection>
          </li>

          <li>
            <CollapsibleSection title="Context">
              <ul className="metric-group">
                <CollapsibleSection title={`Characters (${metrics.character})`}>
                <li><Link to={`/projectarchive/${projectName}/characters`}>Characters <span className="metric-count">{metrics.characters}</span></Link></li>
                </CollapsibleSection>
                <li><Link to={`/projectarchive/${projectName}/themes`}>Themes <span className="metric-count">{metrics.themes}</span></Link></li>
              </ul>
            </CollapsibleSection>
          </li>

          <li>
            <CollapsibleSection title="Tools">
              <ul className="metric-group">
                <li><Link to={`/projectarchive/${projectName}/plot-outline`}>Plot Outline</Link></li>
                <CollapsibleSection title="Structure Generator">
                  <li><Link to={`/projectarchive/${projectName}/structure/three-act`}>Three Act Structure</Link></li>
                  <li><Link to={`/projectarchive/${projectName}/structure/hero-journey`}>Hero's Journey</Link></li>
                  <li><Link to={`/projectarchive/${projectName}/structure/save-the-cat`}>Save the Cat</Link></li>
                </CollapsibleSection>
                <li><Link to={`/projectarchive/${projectName}/ai-writing-assistant`}>AI Writing Assistant</Link></li>
                <li><strong>Word Count:</strong> <span>0</span></li>
              </ul>
            </CollapsibleSection>
          </li>

          <li><Link to={`/projectarchive/${projectName}/credits`}>Credits</Link></li>
        </ul>
      </div>

      <div
        className="resize-handle"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopResizing}
      />
    </div>
  );
}

export default SidebarProject;