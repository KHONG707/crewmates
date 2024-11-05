// src/pages/CreateCrewmate.js
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const CreateCrewmate = () => {
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [color, setColor] = useState('Red');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Attempting to insert crewmate:', { name, speed, color });

        // Insert new crewmate into Supabase
        const { data, error } = await supabase
            .from('crewmates')
            .insert([{ name, speed: Number(speed), color }]);

        if (error) {
            console.error('Error creating crewmate:', error); // Log any errors
            console.log('Error details:', error);
            setMessage('Failed to create crewmate.');
        } else {
            console.log('Crewmate created successfully:', data); // Log success message
            setMessage(`Crewmate ${name} created successfully!`);
            // Reset form fields
            setName('');
            setSpeed('');
            setColor('Red');
        }
    };

    return (
        <div className="main-content">
            <h1>Create a New Crewmate</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Speed (mph):
                    <input
                        type="number"
                        value={speed}
                        placeholder="Enter speed"
                        onChange={(e) => setSpeed(e.target.value)}
                        min="1"
                        required
                    />
                </label>

                <label>
                    Color:
                    <select value={color} onChange={(e) => setColor(e.target.value)} required>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Orange">Orange</option>
                        <option value="Pink">Pink</option>
                        <option value="Purple">Purple</option>
                    </select>
                </label>

                <button type="submit">Create Crewmate</button>
            </form>
        </div>
    );
};

export default CreateCrewmate;
