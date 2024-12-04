import React, { useState } from 'react';
import axios from 'axios';

const UpdateData = () => {
  const [team, setTeam] = useState('');
  const [updates, setUpdates] = useState({
    gamesPlayed: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    year: 0,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { gamesPlayed, win, draw, loss } = updates;
    const newErrors = {};

    // Team must not be empty
    if (!team.trim()) {
      newErrors.team = 'Team name is required.';
    }

    // Ensure win, draw, and loss add up to gamesPlayed
    if (parseInt(win) + parseInt(draw) + parseInt(loss) !== parseInt(gamesPlayed)) {
      newErrors.gamesPlayed =
        'Wins, draws, and losses must add up to the total games played.';
    }

    // Ensure win, draw, and loss are valid
    if (parseInt(win) > parseInt(gamesPlayed)) {
      newErrors.win = 'Wins cannot exceed total games played.';
    }
    if (parseInt(draw) > parseInt(gamesPlayed)) {
      newErrors.draw = 'Draws cannot exceed total games played.';
    }
    if (parseInt(loss) > parseInt(gamesPlayed)) {
      newErrors.loss = 'Losses cannot exceed total games played.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    // Update state and handle numeric conversion
    setUpdates({
      ...updates,
      [name]: name === 'team' ? value : parseInt(value, 10) || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fix the errors before submitting.');
      return;
    }

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
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        {errors.team && <p style={{ color: 'red' }}>{errors.team}</p>}
      </div>
      {Object.keys(updates).map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            type="number"
            name={field}
            value={updates[field]}
            onChange={handleUpdateChange}
          />
          {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
        </div>
      ))}
      <button type="submit">Update Data</button>
    </form>
  );
};

export default UpdateData;
