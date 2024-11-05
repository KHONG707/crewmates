// src/pages/CrewmateDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

const CrewmateDetails = () => {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase.from('crewmates').select('*').eq('id', id).single();
            if (error) console.error('Error fetching crewmate:', error);
            else setCrewmate(data);
        };
        fetchCrewmate();
    }, [id]);

    return (
        <div className="main-content">
            {crewmate ? (
                <>
                    <h1>Crewmate: {crewmate.name}</h1>
                    <p>Color: {crewmate.color}</p>
                    <p>Speed: {crewmate.speed} mph</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CrewmateDetails;
