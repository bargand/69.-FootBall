import React, { useState } from 'react';
import axios from 'axios';

const Summary = () => {
  const [team, setTeam] = useState('');
  const [summary, setSummary] = useState({});

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/football/summary?team=${team}`);
      setSummary(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        placeholder="Enter Team Name"
      />
      <button onClick={fetchSummary}>Get Summary</button>
      <div>
        <p>Total Games Played: {summary.gamesPlayed}</p>
        <p>Total Wins: {summary.win}</p>
        <p>Total Draws: {summary.draw}</p>
      </div>
    </div>
  );
};

export default Summary;
