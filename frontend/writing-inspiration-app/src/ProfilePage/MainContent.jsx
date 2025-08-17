import React from 'react';
import './ProfilePage.css';
import './MainContent.css';
import OverviewPage from './MainContent/OverviewPage';
import MyVideosPage from './MainContent/MyVideosPage';
import MyProjectsPage from './MainContent/MyProjectsPage';
import MyPicturesPage from './MainContent/MyPicturesPage.jsx';
import MyArchive from './MainContent/MyArchive.jsx';
import { Routes, Route } from 'react-router-dom';

const MainContent = (props) => {
  return (
    <main className="main-content">
      {/* Your main content goes here, switch between the options */}
      <Routes>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="myprojects" element={<MyProjectsPage {...props}/>} />
        <Route path="myvideos" element={<MyVideosPage/>} />
        <Route path="mypictures" element={<MyPicturesPage/>} />
        <Route path="myarchive" element={<MyArchive {...props} />} />
      
        <Route path="*" element={<OverviewPage />} /> {/* Default route */}
      </Routes>
    </main>
  );
};

export default MainContent;