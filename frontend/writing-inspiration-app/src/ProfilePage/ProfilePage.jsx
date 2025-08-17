import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './ProfilePage.css'
import '../RegistrationPage/Register.jsx'
import '../LoginPage/LoginPage.jsx'
import Sidebar from './Sidebar.jsx'
import TopNav from './TopNav.jsx'
import MainContent from './MainContent.jsx'
import ArchivePage from './Project Archive/ArchivePage.jsx'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
function ProfilePage() {
    //let [newEmails, setCount] = useState(0)
    

    // load the LocalStorage on mount for activeProjects. If no project is stored yet, then just return an empty array.
    const [projects, setProjects] = useState(() => {
        try{
            const saved = localStorage.getItem('projects');
                if (saved) {
                    return JSON.parse(saved).map(proj => ({
                        id: proj.id,
                        name: proj.name,
                        description: proj.description || 'Add Description'
                    }));
                }
                return [];
        } catch (error) {
            console.warn("Failed to parse any active projects from localStorage")
            return [];
        } 
    }); 

    
  // load the LocalStorage on mount for archivedProjects. If no project is stored yet, then just return an empty array.
  const [archivedProjects, setArchivedProjects] = useState(() => {
    try {
        const saved = localStorage.getItem('archivedProjects');
        return saved ? JSON.parse(saved) : [];
    } catch (error){
        console.warn("Failed to parse archivedProjects from localStorage");
        return [];
    }
  
  });

  const [isPopopupOpen, setIsPopupOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const navigate = useNavigate();

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('archivedProjects', JSON.stringify(archivedProjects)); }, [archivedProjects]);

  const addProject = () => {
    const newId = uuidv4();
    setProjects([...projects, { id: newId, name: `Untitled Project ${projects.length}`, description: 'Add Description' }]);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleOpeningPopup = (project) => {
    setCurrentProject(project);
    setIsPopupOpen(true);
  };

  const handleClosingPopup = () => {
    setIsPopupOpen(false);
    setCurrentProject(null);
  };

  const handleEditClick = (project, event) => {
    event?.stopPropagation();
    handleOpeningPopup(project);
  };

  const editProject = (id, updatedData) => {
    setProjects(projects.map(project => project.id === id ? { ...project, ...updatedData } : project));
  };

  const handleNavigate = (projectID)=> {
    // // Construct relative path by appending to current path
    // // Ensure no double slashes
    // let basePath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
    navigate(`/project/${String(projectID)}`);

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedName = formData.get('project-name').trim();
    const updatedDesc = formData.get('project-desc').trim();

    const updates = { name: updatedName, description: updatedDesc };

    if (currentProject?.id && projects.some(p => p.id === currentProject.id)) {
      editProject(currentProject.id, updates);
    } else if (currentProject?.id && archivedProjects.some(p => p.id === currentProject.id)) {
      setArchivedProjects(prev => prev.map(p => p.id === currentProject.id ? { ...p, ...updates } : p));
    } else {
      setProjects([...projects, { id: currentProject?.id || uuidv4(), name: updatedName || 'New Project', description: updatedDesc || 'Add Description' }]);
    }

    handleClosingPopup();
  };

  const handleArchiving = (aProject) => {
    setArchivedProjects(prev => [...prev, aProject]);
    setProjects(prev => prev.filter(p => p.id !== aProject.id));
  };

  const handleUnarchiving = (aProject) => {
    setProjects(prev => [...prev, aProject]);
    setArchivedProjects(prev => prev.filter(p => p.id !== aProject.id));
  };

    return (
        //might have to integrate all these linked sections as their own components.

        //FOR NOW don't worry about Followed Artists/Authors, music, text collection sections
        //Just have sections of all your uploaded content: Videos, Documents, Music
        

        <div className="profile-page-container">
            <Sidebar />
            <div className="content-wrapper">
                <TopNav />
                <MainContent
                    navigate={handleNavigate}
                    projects={projects}
                    setProjects={setProjects}
                    archivedProjects={archivedProjects}
                    addProject={addProject}
                    deleteProject={deleteProject}
                    handleEditClick={handleEditClick}
                    handleFormSubmit={handleFormSubmit}
                    handleArchiving={handleArchiving}
                    handleUnarchiving={handleUnarchiving}
                    isPopopupOpen={isPopopupOpen}
                    currentProject={currentProject}
                    handleOpeningPopup={handleOpeningPopup}
                    handleClosingPopup={handleClosingPopup}
                />
            </div>

        </div>

        


    )
}

export default ProfilePage