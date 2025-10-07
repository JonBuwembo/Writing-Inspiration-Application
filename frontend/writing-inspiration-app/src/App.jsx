import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Register from './RegistrationPage/Register.jsx'
import 'react-quill/dist/quill.snow.css';

import LoginPage from './LoginPage/LoginPage.jsx'
import HomePage from './HomePage/HomePage.jsx'
import ProfilePage from './ProfilePage/ProfilePage.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArchivePage from './ProfilePage/Project Archive/ArchivePage.jsx';
import ProjectContentProjection from './ProfilePage/Project Archive/ProjectContentProjection.jsx';
import NoteEditor from './ProfilePage/Project Archive/Archive Content Projection/NoteEditor/NoteEditor.jsx';
import Overview from './ProfilePage/Project Archive/Archive Content Projection/Overview.jsx';
import Credits from './ProfilePage/Project Archive/Archive Content Projection/Credits.jsx';
import AIWritingAssistant from './ProfilePage/Project Archive/AIWritingAssistant.jsx';
import supabase from './config/supabaseClient.js';
// import AuthCallback from './auth/authCallback.jsx';
import { useAuth } from './auth/authProvider.jsx';
import { useEffect } from 'react';
function App() {
  //Syncing to local storage.
  // const {user, loading} = useAuth();

  // if (loading) return <div>Loading...</div>; // waiting for authentication.

  useEffect(() => {
    // For Fake testing, created a dummy user for project database:
    // check if the user exists already

    const seedData = async () => {

      const {data, error} = await supabase
      .from("app_users")
      .select("*")
      .eq("id", "11111111-1111-1111-1111-111111111111");

      if (!error && data.length === 0) {
        await supabase.from("app_users").insert([
          {
            id: "11111111-1111-1111-1111-111111111111",
            first_name: "Daniel",
            last_name: "Brown",
            email: "brownie.user@example.com",
            username: "dbrown"
          },
        ]);
      }
    };

    seedData();
  }, []);
  
  return (
  
    
      <Routes>
{/*   
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
        <Route path="/profile/*" element={loading ? (<div>Loading...</div>) : user ? (<ProfilePage />) : (<Navigate to="/login" />)}/> */}

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/*" element={<ProfilePage />}/>

        <Route path="/project/:projectID" element={<ArchivePage />}>
          <Route index element={<ProjectContentProjection />} /> {/* default landing inside project */}
          <Route element={<ProjectContentProjection />}>  {/* wrap nested routes in ProjectContentProjection */}
            <Route path="unsorted/note/:noteId" element={<NoteEditor />} />
            <Route path="note/:noteId" element={<NoteEditor />} />
            <Route path="overview/:noteId" element={<Overview />} />
            <Route path="ai-writing-assistant" element={<AIWritingAssistant />} />
            <Route path="credits" element={<Credits />} />
          </Route>
        </Route>
       

      </Routes>
    

     
  
  );
  
}

export default App

