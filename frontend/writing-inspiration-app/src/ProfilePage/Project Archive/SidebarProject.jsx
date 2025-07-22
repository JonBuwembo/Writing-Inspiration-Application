import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SidebarProject.css';
import './maincontent.css';
import CollapsibleSection from './CollapsibleSection';

function SidebarArchive({ sidebarWidth, setSidebarWidth, projectName }) {
  const [isResizing, setIsResizing] = useState(false);
  const sidebarReference = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Project Type");

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const metrics = {
    sections: 2,
    orphanNotes: 5,
    plotThreads: 3,
    characters: 10,
    themes: 4,
  };

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

  return (
    <div
      className="sidebarArchive-container"
      ref={sidebarReference}
      style={{ width: `${sidebarWidth}px` }}
    >
      <h2 className="project-title-display">{projectName}</h2>
     
     <div className='spacing'>

          
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

          <a 
            href="" 
            className='link-to-dashboard'

            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'

            }}
          >

            <img width="20" height="20" src="https://img.icons8.com/ios/50/briefcase.png" alt="briefcase"/>
            MyDashboard
          
          </a> 

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

      
      <button className="add-content-btn">+ Add Content</button>

      <div className="sidebar-options-container">
        <ul className="metric-group">
          <li>
            <CollapsibleSection title="Navigation">
              <ul className="metric-group">
                <li><a href={`/projectarchive/${projectName}/overview`}>Overview</a></li>
                <li><a href={`/projectarchive/${projectName}/timeline`}>Timeline</a></li>
                <li><a href={`/projectarchive/${projectName}/summary`}>Summary</a></li>
                <CollapsibleSection title={`Sections (${metrics.sections})`}>
                  <li><a href={`/projectarchive/${projectName}/section1`}>Section 1</a></li>
                  <li><a href={`/projectarchive/${projectName}/section2`}>Section 2</a></li>
                </CollapsibleSection>
                <CollapsibleSection title={`Orphan Notes (${metrics.orphanNotes})`}>
                  <li><a href={`/projectarchive/${projectName}/orphan-note1`}>Orphan Note 1</a></li>
                  <li><a href={`/projectarchive/${projectName}/orphan-note2`}>Orphan Note 2</a></li>
                </CollapsibleSection>
                <CollapsibleSection title={`Plot Threads (${metrics.plotThreads})`}>
                  <li><a href={`/projectarchive/${projectName}/plot-thread1`}>Plot Thread 1</a></li>
                  <li><a href={`/projectarchive/${projectName}/plot-thread2`}>Plot Thread 2</a></li>
                </CollapsibleSection>
              </ul>
            </CollapsibleSection>
          </li>

          <li>
            <CollapsibleSection title="Context">
              <ul className="metric-group">
                <li><a href={`/projectarchive/${projectName}/characters`}>Characters <span className="metric-count">{metrics.characters}</span></a></li>
                <li><a href={`/projectarchive/${projectName}/themes`}>Themes <span className="metric-count">{metrics.themes}</span></a></li>
              </ul>
            </CollapsibleSection>
          </li>

          <li>
            <CollapsibleSection title="Tools">
              <ul className="metric-group">
                <li><a href={`/projectarchive/${projectName}/plot-outline`}>Plot Outline</a></li>
                <CollapsibleSection title="Structure Generator">
                  <li><a href={`/projectarchive/${projectName}/structure/three-act`}>Three Act Structure</a></li>
                  <li><a href={`/projectarchive/${projectName}/structure/hero-journey`}>Hero's Journey</a></li>
                  <li><a href={`/projectarchive/${projectName}/structure/save-the-cat`}>Save the Cat</a></li>
                </CollapsibleSection>
                <li><a href={`/projectarchive/${projectName}/ai-writing-assistant`}>AI Writing Assistant</a></li>
                <li><strong>Word Count:</strong> <span>0</span></li>
              </ul>
            </CollapsibleSection>
          </li>

          <li><a href={`/projectarchive/${projectName}/credits`}>Credits</a></li>
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

export default SidebarArchive;
