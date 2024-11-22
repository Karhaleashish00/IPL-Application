import './playersDetails.css'
import React, { useEffect, useState } from 'react';
import GooglePieChart from '../charts/charts.js'
import axios from 'axios';

function PlayersDetails(props) {
    const [player_details, setDetails] = useState({});

    useEffect(() => {
        let postdata = { "player_name": props.data.name,"team":props.data.team };
        console.log("player name : ",props.data.name);
        
        axios
            .post("https://ipl-apis-u32y.onrender.com/get-players-details", postdata)
            .then((res) => {
                console.log("response", res);
                console.log("res.data", res.data);
                setDetails(res.data); // Update state with fetched player details
            })
            .catch((err) => {
                console.error("Error fetching player details", err);
            });
    }, [props.data.name]); // Only re-run this effect if the player's name changes

    return (
        <section style={{ backgroundColor: props.bg,padding:'30px' }} className="container my-container">
            <i onClick={props.back} className="bi bi-arrow-left-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="back bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
            </i>
            <div className="col-12 col">
                <div className="col-6 my-col-6">
                    <img className="image" src={props.data.image_url} alt="Player"/>
                    <label className="name">{props.data.name}</label>
                </div>
                <div className="col-6">
                    <table className="playersDetailsTable">
                        <tbody>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: "25px", fontWeight: "600" }}>{props.data.debut}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400" }}>IPL Debut</p>
                                </th>
                                <th style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: "25px", fontWeight: "600" }}>{props.data.specialization || 'N/A'}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400" }}>Specialization</p>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: "25px", fontWeight: "600" }}>{props.data.dob || 'N/A'}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400" }}>Date of Birth</p>
                                </th>
                                <th style={{ textAlign: 'center' }}>                                
                                    <span style={{ fontSize: "25px", fontWeight: "600" }}>{props.data.jersey_no || 'N/A'}</span>
                                    <p style={{ fontSize: "15px", fontWeight: "400" }}>Jersey Number</p>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {/* Ensure player_details is defined before passing to the chart */}
                {player_details && Object.keys(player_details).length > 0 && (
                    <GooglePieChart data={player_details}/>
                )}
            </div>
        </section>
    );
}

export default PlayersDetails;
