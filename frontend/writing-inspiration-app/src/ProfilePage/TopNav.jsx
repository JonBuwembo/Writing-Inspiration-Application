import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css'
import styles from './SearchStyles.module.css'

import SearchPopUp from './SearchPopup.jsx';

const TopNav = () => {

  const [isOpen, setOpen] = useState(false);
  const [isPopopupOpen, setIsPopupOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);


  //STORAGE KEY FOR PROJECTS IS: "projects"
  const projectStorageKey = "projects";

  const toggleDropdown = () => setOpen(!isOpen);

  const handleOpeningPopup = () => {
    setIsPopupOpen(true);
  }

  const handleClosingPopup = () => {
    setIsPopupOpen(false);
  }

  const handleSearch = (aSearchQuery) => {
      // logic to checking search query and matching it with certain projects.

      // most likely more sensible to pull data from supabase.

      // pull from supabase table for projects and check which project matches 'aSearchQuery'

      // update the searchResults state variable.

      // return the searchResult state variable.

  }

  useEffect(() => {
    const handleKeyDown = (event) => {

      const activeElement = document.activeElement;
      const isTyping = 
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable;

      if (!isTyping && event.key === "/") {
        event.preventDefault();
        handleOpeningPopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="top-nav-container">
      {/* Top Navigation */}
      <header className="top-nav">
        <div style={{position: 'relative', width: '250px'}} className="search-container">
          <i
           className='fas fa-search'
           style={{
            position: "absolute", //is relative to the div container.
            left: "10px",
            top: "50%", // vertical position from top of div container (same size as input box)
            transform: "translateY(-50%)",
            color: '#888',
            pointerEvents: "none", //Icon doesn't block typing
           }}
          ></i>
          <input 
            type="text" 
            onClick={handleOpeningPopup} 
            placeholder=" Type / to Search ...      "
            style={{
              width: "100%",
              padding: "8px 12px 8px 32px", //left padding for my icon
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
            
        </div>

        <div className="options-wrapper-top-profile">

          <ul>
            <li className="nav-buttons">
             
                <div
                    className="upload-wrapper"
                   
                >
                    
                    <button className="nav-btn upload-btn">Upload</button>
           

                    <button
                      className="nav-btn caret-btn"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      <i className="fas fa-upload" style={{ marginRight: '8px', color: 'rgb(35, 34, 34)' }}></i>
                      <i className="fa fa-caret-down" style={{color: 'rgb(35, 34, 34)'}}></i>
                    </button>

                    {isOpen && (
                      <div
                        className="dropdown-content"
                      >
                        
                        <p> Choose Media </p>
                        <a href="#">Video</a>
                        <a href="#">Picture</a>
                      </div>
                    )}
                </div>
            </li>
          </ul>

          <div className="user-info">
            <div className='vertical'> </div>
            <div className='welcome-text'> Welcome Jonathan Buwembo!</div>
          </div>

        </div>
      </header>

      {/* Sub-Navigation */}
      <nav className="sub-nav">
        <ul>
          <li><Link to="/profile/overview">Overview</Link></li>
          <li><Link to="/profile/myprojects">MyProjects</Link></li>
          <li><Link to="/profile/mypictures">MyPictures</Link></li>
          <li><Link to="/profile/myvideos">MyVideos</Link></li>
          <li><Link to="">ArchivedProjects</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>



      <div>
        <SearchPopUp
            isOpen={isPopopupOpen}
            onClose={handleClosingPopup}
        >
          <form
            className={styles.searchContainer}
            role="search"
            autoComplete='off'
          >
            <div style={{position: 'relative', width: '100%'}}>
               <i
                className='fas fa-search'
                style={{
                  position: "absolute", //is relative to the div container.
                  left: "10px",
                  top: "50%", // vertical position from top of div container (same size as input box)
                  transform: "translateY(-50%)",
                  color: '#888',
                  pointerEvents: "none", //Icon doesn't block typing
                }}
                ></i>

                <input 
                  className={styles.searchBar} 
                  id="search-input" 
                  type="search" 
                  placeholder=""
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 32px", //left padding for my icon
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }} 
                />

            </div>
           
            <ul>
                <li className={styles.category}> Projects</li>
                <ul className={styles.searchResults}>
                    {/* dynamically insert matching project results here */}
                </ul>
                <li className={styles.category}> Pictures </li> 
                <ul className={styles.searchResults}>
                    {/* dynamically insert matching Pictures results here */}
                </ul>
                <li className={styles.category}> Videos </li> 
                <ul className={styles.searchResults}>
                    {/* dynamically insert matching Videos results here */}
                </ul>
            </ul>
          </form>
        </SearchPopUp>
      </div>
    </div>
  );
};

export default TopNav;