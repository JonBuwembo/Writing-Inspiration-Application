import React, {useState, useRef, useEffect, useCallback} from 'react';

import './SidebarProject.css'; // Import the sidebar styles
import {Routes, Route, useParams} from 'react-router-dom';
import './maincontent.css'; // Import the main content styles
function SidebarArchive({sidebarWidth, setSidebarWidth, projectID}) {
  
  const [isResizing, setIsResizing] = useState(false); // State to track if resizing is in progress
  const sidebarReference = useRef(null); // Reference to the sidebar element

  // useRef is a React hook that lets you create a "reference" to a DOM element or a value that you want to keep around between renders.
  // Think of it like a way to store something that doesn't change when your component updates.
  // For example, here we use useRef to keep track of the sidebar element in the browser.
  // This lets us directly access and measure the sidebar's position and size, which is useful for things like resizing.
  // Unlike state, changing a ref does NOT cause the component to re-render.
  // You can also use useRef to store any value you want to "remember" between renders, not just DOM elements.

  const metrics = {
    sections: 2, // Example metric for sections
    orphanNotes: 5, // Example metric for orphan notes
    plotThreads: 3, // Example metric for plot threads
    characters: 10, // Example metric for characters
    themes: 4 // Example metric for themes
  };


  // Function to handle touch move event for resizing
  

  // useCallback is used here to memoize the functions so that their identity remains stable between renders.
  // This is important because these functions are added/removed as event listeners in useEffect.
  // If the function reference changed on every render, the event listeners would not be properly cleaned up,
  // potentially causing memory leaks or unexpected behavior. By using useCallback, we ensure that
  // the same function instance is used unless its dependencies change.



  const startResizing = useCallback((event) => {
    setIsResizing(true);
    // Add body class to show resize cursor globally
    document.body.classList.add('resizing-active');
    // Prevent text selection during resize
    document.body.style.userSelect = 'none';
    event.preventDefault();
  }, []);

  const resize = useCallback((event) => {
    if (isResizing && sidebarReference.current) {
      //FUNCTION: only updates with while actively draggins

      //current mouse position calculation: event.clientX
      //getBoundingClientRect().left: Sidebar's left edge position
      const newWidth = event.clientX - sidebarReference.current.getBoundingClientRect().left; 
      //width constrained between 200px and 500px;
      setSidebarWidth(Math.max(350, Math.min(430, newWidth))); // minimum: 350px, maximum: 420px;
    }
  }, [isResizing]);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
    document.body.classList.remove('resizing-active');
    document.body.style.userSelect = '';
  }, []);

  // For mobile devices touch events.
  const handleTouchMove = useCallback((event) =>  {
    if (isResizing && sidebarReference.current) {
      // touched[0] instead of clientX since its for mobile devices.
      const newWidth = event.touches[0].clientX - sidebarReference.current.getBoundingClientRect().left;
      // same width calculation as mouse version min
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

  return (

    <div 
      className="sidebarArchive-container"
      ref={sidebarReference}
      style= {{ 
        width: `${sidebarWidth}px`,
        
      }}
    >
    

      <h2 className="project-title-display">Project {projectID} Archive</h2>

      <hr />

      <div className="project-type-dropdown-container">
        <label htmlFor="project-type-dropdown">Project Type: </label>
        <select id="project-type-dropdown" name="projectType">
          <option value="novel">Novel</option>
          <option value="short-story">Short Story</option>
          <option value="screenplay">Screenplay</option>
          <option value="poetry">Poetry</option>
          <option value="Journalism">Essay</option>
          <option value="other">Other</option>
        </select>
      </div>
      <hr />

      
        <button className="add-content-btn">+ Add Content</button>

        <div className = "sidebar-options-container">

          <ul className="metric-group">
            <li>
              <details className="dashboard-section">
                <summary className="section-title">Navigation</summary>
                <ul className="metric-group">
                  <li><a href={`/projectarchive/${projectID}/overview`}>Overview</a></li>
                  <li><a href={`/projectarchive/${projectID}/timeline`}>Timeline</a></li>
                  <li><a href={`/projectarchive/${projectID}/summary`}>Summary</a></li>
                  <li>
                    <details>
                      <summary className="section-title"> Sections <span className="metric-count">{metrics.sections}</span> </summary>
                      <ul className="metric-group">
                        <li><a href={`/projectarchive/${projectID}/section1`}>Section 1</a></li>
                        <li><a href={`/projectarchive/${projectID}/section2`}>Section 2</a></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary className="section-title">Orphan Notes <span className="metric-count">{metrics.orphanNotes}</span></summary>
                      <ul className="metric-group">
                        <li><a href={`/projectarchive/${projectID}/orphan-note1`}>Orphan Note 1</a></li>
                        <li><a href={`/projectarchive/${projectID}/orphan-note2`}>Orphan Note 2</a></li>
                      </ul>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary className="section-title">Plot Threads <span className="metric-count">{metrics.plotThreads}</span></summary>
                      <ul className="metric-group">
                        <li><a href={`/projectarchive/${projectID}/plot-thread1`}>Plot Thread 1</a></li>
                        <li><a href={`/projectarchive/${projectID}/plot-thread2`}>Plot Thread 2</a></li>
                      </ul>
                    </details>
                  </li>

                </ul>
              </details>
            </li>

            <li>
              <details className="dashboard-section">
                <summary className="section-title">Context</summary>
                <ul className="metric-group">
                  <li><a href={`/projectarchive/${projectID}/characters`}>Characters <span className="metric-count">{metrics.characters}</span></a></li>
                  <li><a href={`/projectarchive/${projectID}/themes`}>Themes <span className="metric-count">{metrics.themes}</span></a></li>
                </ul>
              </details>
            </li>

            <li>
              <details className='dashboard-section'>
                <summary className="section-title">Tools</summary>
                <ul className="metric-group">
                  <li><a href={`/projectarchive/${projectID}/plot-outline`}>Plot Outline</a></li>

                  {/* Structure Generator Dropdown */}
                  <li>
                    <details>
                      <summary className="section-title">Structure Generator</summary>
                      <ul className="metric-group">
                        <li><a href={`/projectarchive/${projectID}/structure/three-act`}>Three Act Structure</a></li>
                        <li><a href={`/projectarchive/${projectID}/structure/hero-journey`}>Hero's Journey</a></li>
                        <li><a href={`/projectarchive/${projectID}/structure/save-the-cat`}>Save the Cat</a></li>
                      </ul>
                    </details>

                  </li>

                  {/* AI Writing Assistant Link */}
                  <li>
                    <a href={`/projectarchive/${projectID}/ai-writing-assistant`}>AI Writing Assistant</a>
                  </li>

                     {/* Word Count inside Tools */}
                  <li>
                    <strong>Word Count:</strong> <span>0</span>
                  </li>

                </ul>
              </details>
            </li>

            <li><a href={`/projectarchive/${projectID}/credits`}>Credits</a></li>
          </ul>

        </div>


        {/* Resize handle for resizing sidebar */}
        <div 
          className="resize-handle"

          
          onMouseDown={startResizing} /* Initial click/touch (for web version) */
          onTouchStart={startResizing} /* Mobile equivalent */
          onTouchMove={handleTouchMove} /* Mobile dragging */
          onTouchEnd={stopResizing} /* Mobile release */
        />
    
    </div>
  );
}

export default SidebarArchive;