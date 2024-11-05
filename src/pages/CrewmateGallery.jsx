// src/pages/CrewmateGallery.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const CrewmateGallery = () => {
    const [crewmates, setCrewmates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrewmates = async () => {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*');

            if (error) {
                console.error('Error fetching crewmates:', error);
            } else {
                setCrewmates(data);
            }
        };

        fetchCrewmates();
    }, []);

    const handleDelete = async (id) => {
        const { error } = await supabase
            .from('crewmates')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting crewmate:', error);
        } else {
            setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
        }
    };

    return (
        <div className="main-content">
            <h1>Your Crewmate Gallery!</h1>
            {crewmates.length === 0 ? (
                <p>No crewmates found.</p>
            ) : (
                <ul>
                    {crewmates.map((crewmate) => (
                        <li key={crewmate.id} className="crewmate-card">
                            <Link to={`/crewmates/${crewmate.id}`}>
                                <p>Name of Crewmate: {crewmate.name}</p>
                                <p>Speed of Crewmate: {crewmate.speed} mph</p>
                                <p>Color of Crewmate: {crewmate.color}</p>
                            </Link>
                            <button onClick={() => navigate(`/crewmates/${crewmate.id}/edit`)}>
                                Edit Crewmate
                            </button>
                            <button onClick={() => handleDelete(crewmate.id)}>
                                Delete Crewmate
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CrewmateGallery;
