import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProjectArchive from '../Project Archive/ArchivePage.jsx';
import { Link } from 'react-router-dom';
import './myProjectsPage.css';
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

    const editProject = (id, newName) => {
        // Find the project to edit
        const projectToEdit = projects.find(project => project.id === id);
        if (projectToEdit) {
            // Update the project name
            const updatedProjects = projects.map(project =>
                project.id === id ? { ...project, name: newName } : project
            );
            setProjects(updatedProjects);
        }
    };


    const handleNavigate = (projectID)=> {
        // // Construct relative path by appending to current path
        // // Ensure no double slashes
        // let basePath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
        navigate(`/projectarchive/${projectID}`);
    };

    return (
        <div>

            <div>
            <h2 className='font'> Here are your projects! </h2>

            <button onClick={addProject} className='add-project-btn'>+ Add Project</button>
            
            <p className='font'> Select any project to view details and unlock AI-powered insights tailored to your work. </p>

            {projects.map(project => (
                <div key={project.id} className='project-container'>
                    {/* Use Link from react-router-dom for client-side routing */}
                    <li className='project-rectangle' onClick={() => handleNavigate(project.id)} > 
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

            {/* Popup for project details */}
            <div>

                <ProjectPopUp
                    isOpen={isPopopupOpen}
                    onClose={handleClosingPopup}
                    popupTitle={currentProject ? `Edit ${currentProject.name}` : 'Edit Project'}
                >
                    <form className="project-edit-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const newName = formData.get('project-name').trim();
                        const newDescription = formData.get('project-desc').trim();

                        if (currentProject) {
                            // If currentProject is set, we are editing an existing project
                            editProject(currentProject.id, newName);
                            setCurrentProject({ ...currentProject, name: newName, description: newDescription });
                        } else {
                            // If currentProject is null, we are adding a new project
                            addProject(newName);
                        }
                        handleClosingPopup();
                    }}>
                        <label htmlFor="project-name">Project Name</label>
                        <textarea id="project-name" name="project-name" rows="2" cols="10" defaultValue={currentProject?.name || ''} />

                        <label htmlFor="project-desc">Project Description</label>
                        <textarea id="project-desc" name="project-desc" rows="2" cols="10" defaultValue={currentProject?.description || ''} />

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