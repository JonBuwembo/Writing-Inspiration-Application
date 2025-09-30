import React, { useEffect } from 'react';
import './myProjectsPage.css';
import './ProjectPopUp.css';
import { v4 as uuidv4 } from 'uuid';
//import ReactModal from 'react-modal';
import ProjectPopUp from './ProjectPopUp.jsx'; // Import the popup component for project details
import supabase from '../../config/supabaseClient.js';

//ReactModal.setAppElement('#root'); // Set the root element for accessibility

/**
 * MyProjectsPage component displays a dynamic (not static) list of the user's projects.
 * Allows users to add new projects and delete existing ones.
 * Projects are managed in local component state.
 */
const MyProjectsPage = ({projects, testUserID, navigate, setProjects, addProject, archivedProjects, handleUnarchiving, isPopopupOpen, currentProject, handleArchiving, handleClosingPopup, handleEditClick, handleFormSubmit}) => {

  

    const deleteProject = async (id) => {
        // Filter out the project with the given id
        // and update the state.
        console.log("You clicked to add a project")
        const {data, error} = await supabase
            .from('projects')
            .delete()
            .eq('id', id)
            .then(({ error }) => {
                if (error) {
                    console.error('Error deleting project:', error.message);
                }
            });
        
        setProjects(projects.filter(project => project.id !== id));
    }

    return (

        <div>

            <div>
                <h2 className='instructive-text'> Active Projects </h2>

                <button onClick={addProject} className='add-project-btn'> <i className="far fa-plus-square"></i> Add Project</button>
                
                <p className='instructive-text'> Select any project to view details and unlock AI-powered insights tailored to your work. </p>

                <div className="project-list-container">
                    {/* Want projects from supabase to show up here.  */}

                    {projects.map(project => (
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
                                <span className="project-status-active">{'Draft'}</span>
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
                                    handleArchiving(project, e);
                                }}
                                aria-label={`Archive ${project.name}`}
                                >
                                <i className="fas fa-archive"></i>
                                </button>
                                
                                <button 
                                className="btn-action btn-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProject(project.id);
                                }}
                                aria-label={`Delete ${project.name}`}
                                >
                                <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
            </div>

            {/* Popup for project details popup appears over everything only when edit button is clicked */}
            <div>

                <ProjectPopUp
                    isOpen={isPopopupOpen}
                    onClose={handleClosingPopup}
                    popupTitle={currentProject && currentProject.name ? `Edit ${currentProject.name}` : 'Edit Project'}
                >
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


           
              
            
            

        </div>        
    );
}

export default MyProjectsPage;