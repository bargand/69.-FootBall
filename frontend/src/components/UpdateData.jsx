import React, { useState } from 'react';
import axios from 'axios';

const UpdateData = () => {
  const [team, setTeam] = useState('');
  const [updates, setUpdates] = useState({});

  const handleUpdateChange = (e) => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/football/update', { team, updates });
      alert('Data updated successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Team Name</label>
        <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} />
      </div>
      {Object.keys({ gamesPlayed: 0, win: 0, draw: 0, loss: 0, goalsFor: 0, goalsAgainst: 0, points: 0, year: 0 }).map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input type="text" name={field} onChange={handleUpdateChange} />
        </div>
      ))}
      <button type="submit">Update Data</button>
    </form>
  );
};

export default UpdateData;
