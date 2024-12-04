import React, { useState } from 'react';
import axios from 'axios';

const Summary = () => {
  const [team, setTeam] = useState('');
  const [summary, setSummary] = useState(null); // Null when no data fetched yet
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    if (!team.trim()) {
      setError('Team name is required.');
      return;
    }
    try {
      setError(''); // Clear previous errors
      const response = await axios.get(`http://localhost:5000/api/football/summary?team=${team}`);
      setSummary(response.data);
    } catch (err) {
      setSummary(null);
      if (err.response && err.response.status === 404) {
        setError('Team not found.');
      } else {
        setError('Failed to fetch summary. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Team Summary</h2>
      <input
        type="text"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        placeholder="Enter Team Name"
      />
      <button onClick={fetchSummary}>Get Summary</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {summary && !error ? (
        <div>
          <p>Total Games Played: {summary.gamesPlayed}</p>
          <p>Total Wins: {summary.win}</p>
          <p>Total Draws: {summary.draw}</p>
        </div>
      ) : (
        summary === null && <p>Enter a team name to view its summary.</p>
      )}
    </div>
  );
};

export default Summary;
