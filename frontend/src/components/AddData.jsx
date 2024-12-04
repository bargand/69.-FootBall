import React, { useState } from 'react';
import axios from 'axios';

const AddData = () => {
  const [formData, setFormData] = useState({
    team: '', // String input
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
    const { team, gamesPlayed, win, draw, loss } = formData;
    const newErrors = {};

    // Ensure the team field is not empty and is a valid string
    if (!team.trim()) {
      newErrors.team = 'Team name is required and must be a valid string.';
    }

    // Ensure win, draw, and loss add up to gamesPlayed
    if (parseInt(win) + parseInt(draw) + parseInt(loss) !== parseInt(gamesPlayed)) {
      newErrors.gamesPlayed =
        'Wins, draws, and losses must add up to the total games played.';
    }

    // Ensure win is less than or equal to games played
    if (parseInt(win) > parseInt(gamesPlayed)) {
      newErrors.win = 'Wins cannot be greater than the total games played.';
    }

    // Ensure draw is less than or equal to games played
    if (parseInt(draw) > parseInt(gamesPlayed)) {
      newErrors.draw = 'Draws cannot be greater than the total games played.';
    }

    // Ensure loss is less than or equal to games played
    if (parseInt(loss) > parseInt(gamesPlayed)) {
      newErrors.loss = 'Losses cannot be greater than the total games played.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure team is handled as a string, others as numbers
    setFormData({
      ...formData,
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
      await axios.post('http://localhost:5000/api/football/add', formData);
      alert('Data added successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="add-data-container">
      <h2 className="AddFootbalData">Add Football Data</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              type={field === 'team' ? 'text' : 'number'} // String for team, number for others
              name={field}
              onChange={handleChange}
              value={formData[field]}
            />
            {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
          </div>
        ))}
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
};

export default AddData;
