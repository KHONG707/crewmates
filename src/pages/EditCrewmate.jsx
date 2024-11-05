// src/pages/EditCrewmate.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const EditCrewmate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [color, setColor] = useState('Red');

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching crewmate:', error);
            } else {
                setName(data.name);
                setSpeed(data.speed);
                setColor(data.color);
            }
        };

        fetchCrewmate();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('crewmates')
            .update({ name, speed: Number(speed), color })
            .eq('id', id);

        if (error) {
            console.error('Error updating crewmate:', error);
        } else {
            navigate(`/crewmates/${id}`); // Redirect to the crewmate's info page
        }
    };

    return (
        <div className="main-content">
            <h1>Edit Crewmate</h1>
            <form onSubmit={handleUpdate}>
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
        </div>
    );
};

export default EditCrewmate;
