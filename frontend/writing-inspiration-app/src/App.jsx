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
import AuthCallback from './auth/authCallback.jsx';
import { AuthProvider, useAuth } from './auth/authProvider.jsx';


function App() {
  //Syncing to local storage.
  const {user, loading} = useAuth();

  if (loading) return <div>Loading...</div>
  
  return (
   
  
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        {/* TODO: UI done */}
        {/* <Route path="/login" element={<LoginPage/>} /> */}
        {/* TODO: UI done */}
        <Route path="/Register" element={<Register/>} />

        
        {/* TODO: UI currently working on */}
        <Route path="/home/*" element={<HomePage/>} />
        {/* not made yet */}
        {/* <Route path="/profile/*" element={<ProfilePage />} /> has subroutes */}

        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/profile" />} />

        <Route path="/" element={user ? <Navigate to="/profile" /> : <Navigate to="/login" />} />

        {/* <Route path="/profile" element={<ProfilePage/>} /> */}

        <Route path="/project/:projectID" element={<ArchivePage />}>
          <Route index element={<ProjectContentProjection />} /> {/* default landing inside project */}
          <Route element={<ProjectContentProjection />}>  {/* wrap nested routes in ProjectContentProjection */}
            <Route path="unsorted/note/:noteId" element={<NoteEditor />} />
            <Route path="note/:noteId" element={<NoteEditor />} />
            <Route path="overview/:noteId" element={<Overview />} />
            <Route path="credits" element={<Credits />} />
          </Route>
        </Route>
       

      </Routes>

     
  
  );
  
}

export default App

