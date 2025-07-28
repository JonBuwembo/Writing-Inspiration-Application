import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProjectArchive from '../Project Archive/ArchivePage.jsx';
import { Link } from 'react-router-dom';
import './myProjectsPage.css';
import './ProjectPopUp.css';
import SidebarProject from '../Project Archive/SidebarProject.jsx';
//import ReactModal from 'react-modal';
import ProjectPopUp from './ProjectPopUp.jsx'; // Import the popup component for project details


//ReactModal.setAppElement('#root'); // Set the root element for accessibility

/**
 * MyProjectsPage component displays a dynamic (not static) list of the user's projects.
 * Allows users to add new projects and delete existing ones.
 * Projects are managed in local component state.
 */
const MyProjectsPage = () => {

    const [projects, setProjects] = React.useState(() => {
        // { id: 1, name: 'Project 1' },
        // { id: 2, name: 'Project 2' },
        const saved = localStorage.getItem('projects');
        // return saved ? JSON.parse(saved) : [];
        if (saved) {
            return JSON.parse(saved).map(proj => ({
                id: proj.id,
                name: proj.name,
                description: proj.description || 'Add Description' // Ensure description is always present
            }))
        }

        return [];
    });

    // For popup page functionality.
    const [isPopopupOpen, setIsPopupOpen] = React.useState(false);
    const [currentProject, setCurrentProject] = React.useState(null);


    const navigate = useNavigate();
    //const location = useLocation();

    // opening popup when user clicks on a project.
    const handleOpeningPopup = (project) => {
        setCurrentProject(project);
        setIsPopupOpen(true);
    };

    // closing popup when user clicks on the close button.
    const handleClosingPopup = () => {
        setIsPopupOpen(false);
        setCurrentProject(null);
    };

    useEffect(() => {
        // Save projects to local storage whenever they change
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);


    const addProject = () => {
        // ID is length of list of projects so far.
        const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;
        setProjects([...projects, { id: newId, name: `Project ${newId}`, description: 'Add Description' }]);
    };

    const deleteProject = (id) => {
        // Filter out the project with the given id
        // and update the state.
        setProjects(projects.filter(project => project.id !== id));
    }

    const handleEditClick = (project, event) => {
        event.stopPropagation();
        setCurrentProject(project);
        setIsPopupOpen(true);
    }

    const editProject = (id, updatedData) => {
        // Find the project to edit
       setProjects(projects.map(project => project.id === id? { ...project, ...updatedData}: project));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedName = formData.get('project-name').trim();
        const updatedDesc = formData.get('project-desc').trim();

        if (currentProject.id && projects.some(project => project.id === currentProject.id)) {
            // If currentProject has an id, update the existing project
            editProject(currentProject.id, {
                name: formData.get('project-name').trim(),
                description: formData.get('project-desc').trim()
            });
        } else {
            // Add a new project.
            setProjects([...projects, {
                id: currentProject.id, 
                name: updatedName || `Project ${currentProject.id}`, 
                description: updatedDesc || 'Add Description' 
            }]);
        }
        
        handleClosingPopup();
    };


    const handleNavigate = (projectName)=> {
        // // Construct relative path by appending to current path
        // // Ensure no double slashes
        // let basePath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
        navigate(`/project/${projectName}`);

    };

    return (
        <div>

            <div>
            <h2 className='font'> Here are your projects! </h2>

            <button onClick={addProject} className='add-project-btn'>+ Add Project</button>
            
            <p className='font'> Select any project to view details and unlock AI-powered insights tailored to your work. </p>

            <div className="project-list-container">
                {projects.map(project => (
                    <div key={project.id} className='project-container'>
                        {/* Use Link from react-router-dom for client-side routing */}
                        <li className='project-rectangle' onClick={() => handleNavigate(project.name)} > 
                        <header className='project-header'>
                            
                                {project.name}

                        </header> 


                        <p> {project.description || 'No description yet'}</p>


                        
                                {/* Button to open popup*/}
                                <button 
                                    className='edit-project-btn' 
                                    onClick={(e) => handleEditClick(project, e)}
                                    aria-label="Edit Project"
                                >
                                Edit
                                </button>
                        </li>      

                        <li className='delete-box' onClick={() => deleteProject(project.id)}> <p> Delete </p></li>
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