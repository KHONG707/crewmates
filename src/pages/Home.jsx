// src/pages/Home.js
import React from 'react';

const Home = () => (
    <div className="main-content">
        <h1 className="title">Welcome to the Crewmate Creator!</h1>
        <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>
        <img
            src="path/to/among-us-crew.png" // Replace with a path to your image or a URL
            alt="Crewmates"
            style={{ maxWidth: '100%', marginTop: '20px' }}
        />
    </div>
);

export default Home;
