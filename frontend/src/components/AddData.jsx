import React, { useState } from 'react';
import axios from 'axios';
// import './AddData.css';

const AddData = () => {
  const [formData, setFormData] = useState({
    team: '',
    gamesPlayed: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    year: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/football/add', formData);
      alert('Data added successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="add-data-container">
      <h2>Add Football Data</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input type="text" name={field} onChange={handleChange} />
          </div>
        ))}
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
};

export default AddData;
