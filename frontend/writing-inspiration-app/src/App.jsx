import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Register from './Register.jsx'
import LoginPage from './LoginPage.jsx'
import HomePage from './HomePage/HomePage.jsx'
import ProfilePage from './ProfilePage/ProfilePage.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



function App() {
  //let [newEmails, setCount] = useState(0)
  
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        {/* TODO: UI done */}
        <Route path="/login" element={<LoginPage/>} />
        {/* TODO: UI done */}
        <Route path="/Register" element={<Register/>} />
        {/* TODO: UI currently working on */}
        <Route path="/home/*" element={<HomePage/>} />
        {/* not made yet */}
        <Route path="/profile/*" element={<ProfilePage />} /> {/*has subroutes*/}

        {/* <Route path="/profile" element={<ProfilePage/>} /> */}

        </Routes>
      </Router>
  );
  
}

export default App

