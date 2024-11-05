// src/pages/UpdateCrewmate.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const UpdateCrewmate = () => {
    const { id } = useParams(); // Get crewmate ID from URL params
    const navigate = useNavigate();

    // State for crewmate details
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState(1);
    const [color, setColor] = useState('Red');
    const [message, setMessage] = useState('');

    // Fetch the current crewmate details on page load
    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', id)
                .single(); // Fetch only one crewmate by ID
            if (error) {
                console.error('Error fetching crewmate:', error);
                setMessage('Error loading crewmate data');
            } else {
                setName(data.name);
                setSpeed(data.speed);
                setColor(data.color);
            }
        };
        fetchCrewmate();
    }, [id]);

    // Handle form submission to update the crewmate
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('crewmates')
            .update({ name, speed, color })
            .eq('id', id); // Update crewmate where ID matches

        if (error) {
            console.error('Error updating crewmate:', error);
            setMessage('Failed to update crewmate.');
        } else {
            setMessage(`Crewmate updated successfully!`);
            setTimeout(() => {
                navigate('/gallery'); // Redirect back to the gallery after success
            }, 1000);
        }
    };

    // Handle deletion of the crewmate
    const handleDelete = async () => {
        const { error } = await supabase
            .from('crewmates')
            .delete()
            .eq('id', id); // Delete crewmate where ID matches

        if (error) {
            console.error('Error deleting crewmate:', error);
            setMessage('Failed to delete crewmate.');
        } else {
            setMessage('Crewmate deleted successfully.');
            setTimeout(() => {
                navigate('/gallery'); // Redirect back to the gallery after deletion
            }, 1000);
        }
    };

    return (
        <div className="main-content">
            <h1>Update Your Crewmate</h1>
            <p>{message}</p>
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
                        <option value="Rainbow">Rainbow</option>
                    </select>
                </label>

                <button type="submit">Update Crewmate</button>
            </form>

            {/* Delete Button */}
            <button onClick={handleDelete} className="delete-button">Delete Crewmate</button>
            <button onClick={() => navigate('/gallery')} className="back-button">Back to Gallery</button>
        </div>
    );
};

export default UpdateCrewmate;
