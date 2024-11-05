// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <div className="sidebar">
        <h2>Crewmate Creator</h2>
        <Link to="/">Home</Link>
        <Link to="/create">Create a Crewmate</Link>
        <Link to="/gallery">Crewmate Gallery</Link>
    </div>
);

export default Sidebar;
