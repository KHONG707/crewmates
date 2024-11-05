// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import CrewmateGallery from './pages/CrewmateGallery';
import CrewmateInfo from './pages/CrewmateInfo';  // Import the individual info page component
import EditCrewmate from './pages/EditCrewmate';   // Import the edit page component

import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateCrewmate />} />
                        <Route path="/gallery" element={<CrewmateGallery />} />
                        <Route path="/crewmates/:id" element={<CrewmateInfo />} />   {/* Unique page for each crewmate */}
                        <Route path="/crewmates/:id/edit" element={<EditCrewmate />} /> {/* Edit page for each crewmate */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
