import { useState } from 'react'
// import './App.css'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './ProfilePage.css'
import '../RegistrationPage/Register.jsx'
import '../LoginPage/LoginPage.jsx'
import Sidebar from './Sidebar.jsx'
import TopNav from './TopNav.jsx'
import MainContent from './MainContent.jsx'
import supabase from '../config/supabaseClient.js'
import { useAuth } from '../auth/authProvider.jsx';
import { v4 as uuidv4 } from 'uuid';
function ProfilePage() {
  // let [newEmails, setCount] = useState(0)
  // const { user: authUser } = useAuth();

  //Media upload form state
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [mediaDesc, sedMediaDesc] = useState("");

  const [isOpen, setOpen] = useState(false);
  const [popupType, setPopupType] = useState(null); // "Image" or "Video"
  const [isPopopupOpen, setIsPopupOpen] = useState(false);

  const [currentProject, setCurrentProject] = useState(null);
  const navigate = useNavigate();

 

  const [user, setUser] = useState({});
  const testUserID = "11111111-1111-1111-1111-111111111111";

  useEffect(() => {
    const fetchName = async () => {
      // if (!authUser) return;
     
      const {data, error} = await supabase
        .from('app_users')
        .select('first_name')
        .eq('id', testUserID)
        .single();

      if (error) {
        console.error('Error fetching user/s name: ', error);
      } else {
        setUser(data);
      }
    }

    fetchName();
  }, []);
    

    // load the LocalStorage on mount for activeProjects. If no project is stored yet, then just return an empty array.
  const [projects, setProjects] = useState(() => {
    try{
      const saved = localStorage.getItem('projects');
        if (saved) {
          return JSON.parse(saved).map(proj => ({
            id: proj.id,
            name: proj.name,
            description: proj.description || 'Add Description',
            archived_at: new Date().toISOString(),
            user_id: proj.user_id || null
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



  // Persist to localStorage
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('archivedProjects', JSON.stringify(archivedProjects)); }, [archivedProjects]);

  const addProject = async () => {
    const newId = uuidv4();

    console.log("You clicked to add a project")

    await supabase.from("projects")
      .upsert(
        [
          {
              id: newId,
              name: `Untitled Project ${projects.length}`, 
              description: 'Add Description', 
              archived_at: null, 
              user_id: "11111111-1111-1111-1111-111111111111"
          },
        ]
      );
    
    console.log("Passed adding project to supabase")

    // if (error) {
    //   console.error("Supabase insert error: ", error);
    //   return
    // }
    
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

  
  const handleClosingPopupMedia = () => {
    setPopupType(null);
    setIsPopupOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }

  const submitMedia = (e) => {
    e.preventDefault();
    console.log("submitMedia triggered"); 

    if (!mediaFile) {
      alert("Please select a media file to upload.");
      return;
    }

    const isImage = mediaFile.type.startsWith('image/');
    const isVideo = mediaFile.type.startsWith('video/');

    const src = URL.createObjectURL(mediaFile);

    const newMedia = {
      src, // preview of image/video
      title: mediaName,
      description: mediaDesc,
      type: isImage ? "image" : isVideo ? "video" : "other"
    };

    console.log("New Media to upload: ", newMedia);

    try {
      let existingMedia = JSON.parse(localStorage.getItem("media")) || [];
      console.log("Parsed media:", existingMedia);
      existingMedia.push(newMedia);
      localStorage.setItem("media", JSON.stringify(existingMedia));
    } catch (err) {
      console.error("Error saving media to localStorage: ", err);
    }

    alert("Media uploaded successfully!");

    setMediaFile(null);
    setMediaName("");
    sedMediaDesc("");
    handleClosingPopupMedia();
  }


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

  const handleArchiving = async (aProject) => {

    const {data, error} = await supabase 
          .from('projects')
          .update('archived_at', new Date().toISOString)
          .eq('id', aProject.id)
          .select();
    
    if (error) {
      console.log("Error updating this project to archive status")
    } else if (data && data.length > 0) {
      setArchivedProjects(prev => [...prev, aProject]);
      setProjects(prev => prev.filter(p => p.id !== aProject.id));
    }
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
                <TopNav 
                    user={user}
                    setMediaDesc={sedMediaDesc}
                    mediaDesc={mediaDesc}
                    setMediaFile ={setMediaFile}
                    mediaFile={mediaFile}
                    setMediaName={setMediaName}
                    mediaName={mediaName}
                    submitMedia={submitMedia}
                    popupType={popupType}
                    setPopupType={setPopupType}
                    setIsPopupOpen={setIsPopupOpen}
                    isOpen={isOpen}
                    setOpen={setOpen}
                    
                />
                <MainContent
                    navigate={handleNavigate}
                    testUserID={testUserID}
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
                    setMediaDesc={sedMediaDesc}
                    mediaDesc={mediaDesc}
                    setMediaFile ={setMediaFile}
                    mediaFile={mediaFile}
                    setMediaName={setMediaName}
                    mediaName={mediaName}
                    submitMedia={submitMedia}
                    
           
                />
            </div>

        </div>

        


    )
}

export default ProfilePage