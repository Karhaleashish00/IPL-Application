import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlayerSelection = ({ onplayerSelect, onCancel }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');

  useEffect(() => {
    // Fetch teams from API
    fetch("https://ipl-apis-u32y.onrender.com/get-all-teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle team selection
  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId);
    setSelectedPlayer(''); // Reset the player selection
  };

  // Handle player selection
  const handlePlayerChange = (player) => {
    setSelectedPlayer(player);
    onplayerSelect(selectedTeam, player, true);
  };

  // Reset the selection to allow reselecting team
  const resetSelection = () => {
    setSelectedTeam('');
    setSelectedPlayer('');
  };

  // Cancel selection and close modal (trigger parent functionality)
  const handleCancel = () => {
    onCancel(); // This should trigger hiding the modal in parent component
  };

  // Find the selected team object
  const selectedTeamObject = teams.find(team => team._id === selectedTeam);

  return (
    <div 
      className="position-fixed d-flex justify-content-center align-items-center" 
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
        zIndex: 1050, // Ensures it's above other components
        overflowY: 'auto'
      }}
    >
      <div className="container mt-5 p-4 border rounded bg-light shadow-lg" style={{ maxWidth: '600px', position: 'relative',marginBottom:'40px' }}>
        {/* Cross (X) button to close */}
        <button 
          onClick={handleCancel} 
          className="btn-close position-absolute" 
          style={{ top: '10px', right: '10px' }} 
          aria-label="Close">
        </button>

        <h2 className="text-center mb-4">Select Player One</h2>

        {/* Conditional rendering: Show team list only if no team is selected */}
        {!selectedTeam && (
          <div className="mb-3">
            <h4>Select a Team</h4>
            <ul className="list-group">
              {teams.map((team) => (
                <li
                  key={team._id}
                  className="list-group-item"
                  onClick={() => handleTeamChange(team._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {team._id}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Player selection list - shown only after a team is selected */}
        {selectedTeam && selectedTeamObject && (
          <div className="mt-4">          
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'10px 12px'}}>              
            <h4>
                Select a Player from {selectedTeam}              
              </h4>
              <button className="btn btn-sm btn-outline-secondary float-right" onClick={resetSelection} style={{width:'200px',backgroundColor:'blue',color:'#fff'}}>
                Change Team
              </button>
            </div>

            {/* Scrollable player list */}
            <ul className="list-group" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {selectedTeamObject.players.map((player) => (
                <li
                  key={player}
                  className={`list-group-item ${selectedPlayer === player ? 'active' : ''}`}
                  onClick={() => handlePlayerChange(player)}
                  style={{ cursor: 'pointer' }}
                >
                  {player}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display selected player */}
        {selectedPlayer && (
          <div className="alert alert-info mt-3">
            <h5>Selected Player: {selectedPlayer}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSelection;
