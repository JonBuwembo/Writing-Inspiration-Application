
import React from 'react';
import './HomePage.css';
import Documents from './PublicContent/Documents';
import Videos from './PublicContent/Videos';
import Images from './PublicContent/Images';

import { Routes, Route } from 'react-router-dom';

const PublicPosts = () => {
  return (
    <main className="main-content-2">
      {/* Public Posts go here, mounted on the home/*... root
      
         TODO: Implement these links*/}
      <Routes>
        <Route path="videos" element={<Videos />} />
        <Route path="images" element={<Images/>} />
        <Route path="documents" element={<Documents/>} />
        <Route path="*" element={<Images />} /> {/* Default route is images */}
      </Routes>
    </main>
  );
};

export default PublicPosts;