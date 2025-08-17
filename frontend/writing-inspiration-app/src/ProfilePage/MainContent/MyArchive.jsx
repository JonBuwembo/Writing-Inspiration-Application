import React, { useState } from 'react';
import './MyProjectsPage.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProjectPopUp from './ProjectPopUp';

const MyArchive = ({archivedProjects, handleUnarchiving, navigate, isPopopupOpen, currentProject, handleArchiving, handleClosingPopup, handleEditClick, handleFormSubmit}) => {

    
   

    
    //const location = useLocation();

    // closing popup when user clicks on the close button.
   

    
    // const handleNavigate = (projectID)=> {
    //     // // Construct relative path by appending to current path
    //     // // Ensure no double slashes
    //     // let basePath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
    //     navigate(`/project/${String(projectID)}`);

    // };

  

    return(

        <div>
            <h2 className='instructive-text'> Archived Projects </h2>

            <div className="project-list-container">
                    {archivedProjects && archivedProjects.length > 0 ? 
                        (archivedProjects.map(project => (
                            <div key={project.id} className="project-card">
                            {/* Project Content - Clickable Area */}
                                <div 
                                    className="project-content"
                                    onClick={() => navigate(project.id)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${project.name} project`}
                                >
                                    <div className="project-header">
                                    <h3 className="project-title">{project.name}</h3>
                                    <span className="project-status-archived">{'Archived'}</span>
                                    </div>
                                    
                                    <p className="project-description">
                                    {project.description || 'No description yet'}
                                    </p>
                                    
                                    <div className="project-meta">
                                    <span className="last-edited">
                                        <i className="far fa-clock"></i> Last edited 3 days ago
                                    </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="project-actions">
                                    <button 
                                    className="btn-action btn-edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(project, e);
                                    }}
                                    aria-label={`Edit ${project.name}`}
                                    >
                                    <i className="far fa-edit"></i>
                                    </button>
                                    
                                    <button 
                                    className="btn-action btn-archive"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnarchiving(project, e);
                                    }}
                                    aria-label={`Archive ${project.name}`}
                                    >
                                    <i className="fas fa-undo"></i>
                                    </button>
                                    
                                    {/* <button 
                                    className="btn-action btn-delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnarchiving(project);
                                    }}
                                    aria-label={`Delete ${project.name}`}
                                    >
                                    <i className="far fa-trash-alt"></i>
                                    </button> */}
                                </div>
                            </div>
                    ))) : (
                        <p className="no-archive-text">Currently No Archived Projects</p>
                    )}

                </div>

                <ProjectPopUp
                    isOpen={isPopopupOpen}
                    onClose={handleClosingPopup}
                    popupTitle={`Edit ${currentProject?.name}`}
                >
                    {/* Same form as active projects */}
                    <form 
                        className="project-edit-form"
                        onSubmit={handleFormSubmit}
                    >

                        <p className="title-popup"> Update Project</p>
                        <label className="input-box-label" htmlFor="project-name">Project Name</label>
                        <input className="input-box" id="project-name" name="project-name"  placeholder="Enter project name" defaultValue={currentProject?.name || ''} />

                        <label className="textbox-label" htmlFor="project-desc">Project Description</label>
                        <textarea className="textbox" id="project-desc" name="project-desc"  placeholder= "Enter project description" defaultValue={currentProject?.description || ''} />

                        <div className="form-actions">
                            <button type="button" onClick={handleClosingPopup} className="cancel-button"> Cancel </button>
                            <button type="submit" className="save-button"> Save Changes </button>                            
                        </div>                        
                    </form>
                </ProjectPopUp>
        </div>
    )
}

export default MyArchive;