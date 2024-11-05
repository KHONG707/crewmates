// src/pages/CrewmateInfo.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const CrewmateInfo = () => {
    const { id } = useParams(); // Get the crewmate ID from the URL
    const navigate = useNavigate();
    const [crewmate, setCrewmate] = useState(null);

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
                setCrewmate(data);
            }
        };

        fetchCrewmate();
    }, [id]);

    if (!crewmate) {
        return <p>Loading crewmate details...</p>;
    }

    // Conditional message based on speed
    const speedMessage = crewmate.speed < 5 
        ? "This crewmate is pretty slow. You might want to choose a different crewmate!"
        : "Wow, this crewmate is super fast, that will be helpful! 🏃💨";

    return (
        <div className="crewmate-info">
            <h1>Crewmate: {crewmate.name}</h1>
            <h2>Stats:</h2>
            <p>Color: {crewmate.color}</p>
            <p>Speed: {crewmate.speed} mph</p>
            <p>{speedMessage}</p>

            {/* Edit Button */}
            <button onClick={() => navigate(`/crewmates/${id}/edit`)}>
                Edit this Crewmate
            </button>
        </div>
    );
};

export default CrewmateInfo;
