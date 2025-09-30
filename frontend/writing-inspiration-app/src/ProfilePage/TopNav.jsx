import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css'
import styles from './SearchStyles.module.css'
import moreStyles from './SearchPopUp.module.css'
import { useLocation } from 'react-router-dom';
import SearchPopUp from './SearchPopup.jsx';
import UploadPopup from './UploadPopup.jsx';

const TopNav = ({user}) => {

  // Track popup state
  const [isOpen, setOpen] = useState(false);
  const [popupType, setPopupType] = useState(null); // "Image" or "Video"
  const [isPopopupOpen, setIsPopupOpen] = useState(false);

  // Track search state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  // Track media upload form state
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [mediaDesc, sedMediaDesc] = useState("");

  const location = useLocation(); //Get current location/link user is on.


  //STORAGE KEY FOR PROJECTS IS: "projects"
  const projectStorageKey = "projects";

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  
  
  
  const addImage = (src, title, description) => {
      // add image to local storage
      const images = JSON.parse(localStorage.getItem('images')) || [];
      images.push({ src, title, description });
      localStorage.setItem('images', JSON.stringify(images));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!mediaFile) {
      alert("Please select a media file to upload.");
      return;
    }

    const newMedia = {
      file: mediaFile,
      name: mediaName,
      description: mediaDesc,
      preview: URL.createObjectURL(mediaFile), // showing previews
    };

    console.log("New Media to upload: ", newMedia);

    const existingMedia = JSON.parse(localStorage.getItem('media')) || [];
    existingMedia.push(newMedia);
    localStorage.setItem('media', JSON.stringify(existingMedia));
    alert("Media uploaded successfully!");

    setMediaFile(null);
    setMediaName("");
    sedMediaDesc("");
    handleClosingPopup();
  }

  //mock data to test Search engine:
  const mockProjects = [
    { id: 1, title: "Project Alpha", description: "First Project"},
    { id: 2, title: "Beta Analysis", description: "Data insights" },
    { id: 3, title: "Gamma Notes", description: "Testing search filter" },
    { id: 4, title: "Ants and Animals", description: "Learning a bit about different species"},
    { id: 5, title: "Architecture Project", description: "Study architecture of ancient Rome"},
    { id: 6, title: "Music Project Second Edition", description: "Talking about my journey making my second song!"}
  ];

  const toggleDropdown = () => setOpen(!isOpen);

  const handleOpeningPopup = (media) => {
    setPopupType(media.toLowerCase());
  }

  const handleOpeningSearchPopup = () => {
    setIsPopupOpen(true);
  }

  const handleClosingPopup = () => {
    setPopupType(null);
    setIsPopupOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }

  const handleSearch = (aSearchQuery) => {
      // logic to checking search query and matching it with certain projects.
      // most likely more sensible to pull data from supabase. But we'll test on mock data first.
      // pull from supabase table for projects and check which project matches 'aSearchQuery'
      // update the searchResults state variable.
      // return the searchResult state variable.

      const query = aSearchQuery.trim().toLowerCase();

      if (!query) {
        searchResults([]);
        return;
      }

      const filteredResults = mockProjects.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query));

      setSearchResults(filteredResults);
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

  const HorizontalDivider = () => {
    return  (
      <div style={{ 
        margin: '16px 0',    // Vertical spacing
      }}>
        <div className={styles.fullBleed}>
          <hr className={styles.fullWidthDivider} />
        </div>
       
      </div>
    );
  };

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
            onClick={handleOpeningSearchPopup} 
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
                    
                    <button className="upload-btn">Upload</button>
           

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
                        <a onClick={() => handleOpeningPopup("video")} href="#">Video</a>
                        <a onClick={() => handleOpeningPopup("image")} href="#">Images</a>
                      </div>
                    )}
                </div>
            </li>
          </ul>

          <div className="user-info">
            <div className='vertical'> </div>
            <div className='welcome-text'> Welcome {user.first_name}</div>
          </div>

        </div>
      </header>

      {/* Sub-Navigation */}
      <nav className="sub-nav">
        <ul>
          <li><Link to="/profile/overview" className={location.pathname === '/profile/overview'? 'active-link':''}>Overview</Link></li>
          <li><Link to="/profile/myprojects" className={location.pathname === '/profile/myprojects'? 'active-link':''}>MyProjects</Link></li>
          <li><Link to="/profile/mypictures" className={location.pathname === '/profile/mypictures'? 'active-link':''}>MyImages</Link></li>
          <li><Link to="/profile/myvideos" className={location.pathname === '/profile/myvideos'? 'active-link':''}>MyVideos</Link></li>
          <li><Link to="/profile/myarchive" className={location.pathname === '/profile/myarchive'? 'active-link':''}>MyArchivedProjects</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>



      <div>
        <SearchPopUp
            isOpen={isPopopupOpen}
            onClose={handleClosingPopup}
        >
          <div className={moreStyles.popupInner}> {/* Purpose: wrapper to flex layout */}

          
          <div
            className={styles.searchContainer} 
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
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    handleSearch(value);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 32px", //left padding for my icon
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }} 
                />

            </div>

            <div className={styles.searchResultsWrapper}>
                <ul>
                  <HorizontalDivider />
                  <li className={styles.category}> Projects</li>
                  <ul className={styles.searchResults}>
                    {searchResults.map(project => (
                          <li key={project.id} className={styles.projectItem}> <i className='far fa-bookmark' aria-hidden='true'></i> {project.title}</li>
                    ))}
                  </ul>
                  <HorizontalDivider />
                  <li className={styles.category}> Pictures </li> 
                  <ul className={styles.searchResults}>
                      {/* dynamically insert matching Pictures results here */}
                  </ul>
                  <HorizontalDivider />
                  <li className={styles.category}> Videos </li> 
                  <ul className={styles.searchResults}>
                      {/* dynamically insert matching Videos results here */}
                  </ul>
                </ul>
            </div>
           

          </div>
          </div>
        </SearchPopUp>
      </div>


      <div>
        {/* Upload Popup */}
        {/* Popup for project details popup appears over everything only when edit button is clicked */}
            <div>

                <UploadPopup
                    isOpen={!!popupType} // true if popupType is "image" or "video"
                    onClose={handleClosingPopup}
                    popupTitle={`Upload ${popupType ? popupType[0].toUpperCase() + popupType.slice(1) : ''}`}
                >
                    <form 
                        className="upload-form"
                        onSubmit={handleFormSubmit}
                    >


                        {/* button right here for uploading from device */}
                        <label className="input-box-label" htmlFor="media-file"> Choose File </label>

                        <input type="file" id="media-file" name="media-file"  accept="image/*,video/*" onChange={(e) =>setMediaFile(e.target.files[0])} className="input-box" />

                        <label className="input-box-label" htmlFor="media-name">Media Name</label>
                        <textarea className="input-box" id="media-name" name="media-name"  placeholder="Enter media name" value={mediaName} onChange={(e) => setMediaName(e.target.value)} />

                        <label className="textbox-label" htmlFor="media-desc">Media Description</label>
                        <textarea className="text-box" id="media-desc" name="media-desc"  placeholder= "Enter media description" value={mediaDesc} onChange={(e) => sedMediaDesc(e.target.value)} />

                        <div className="upload-form-actions">
                            <button type="button" onClick={handleClosingPopup} className="upload-cancel-button"> Cancel </button>
                            <button type="submit" onClick={saveToImages} className="upload-save-button"> Save Changes </button>                            
                        </div>                        
                    </form>
                </UploadPopup>
                
               
                
            </div>
          
      </div>
    </div>
  );
};

export default TopNav;