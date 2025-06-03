import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProjectArchive from '../Project Archive/ArchivePage.jsx';
import { Link } from 'react-router-dom';
const containerStyle = {
    width: '600px',
    height: '100px',
    display: 'flex',
    padding: 0,
    margin: 0,
    gap: '20px',
    alignItems: 'center',
    fontSize: '1.5rem',
    margin: '20px'
};

const rectangleStyle = {
    width: '600px',
    height: '100px',
    backgroundColor: 'white',      // white interior
    border: '2px solid black'      // solid black border
};

const boxStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'lightcoral'
};

const addProjectButtonStyle = {
    width: '200px',
    height: '50px',
    backgroundColor: 'blue',
    border: '2px solid black',
    fontSize: '1.2rem',
    margin: '20px',
    borderRadius: '10px',
    cursor: 'pointer'
};

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
        return saved ? JSON.parse(saved) : [];
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Save projects to local storage whenever they change
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const addProject = () => {
        // ID is length of list of projects so far.
        const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;
        setProjects([...projects, { id: newId, name: `Project ${newId}` }]);
    };

    const deleteProject = (id) => {
        // Filter out the project with the given id
        // and update the state.
        setProjects(projects.filter(project => project.id !== id));
    }

    const handleNavigate = (projectID)=> {
        // // Construct relative path by appending to current path
        // // Ensure no double slashes
        // let basePath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
        navigate(`/projectarchive/${projectID}`);
    };

    return (
        <div>
            <h2> Display the user's projects</h2>

            <button onClick={addProject} style={addProjectButtonStyle}>Add Project</button>
            <h3>My Projects</h3>

            {projects.map(project => (
                <div key={project.id} style={containerStyle}>
                    {/* Use Link from react-router-dom for client-side routing */}
                    <button style={rectangleStyle} onClick={() => handleNavigate(project.id)} > {project.name}</button>                    
                    <button style={boxStyle} onClick={() => deleteProject(project.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default MyProjectsPage;