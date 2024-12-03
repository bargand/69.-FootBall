import React, { useState } from 'react';
import axios from 'axios';

const DeleteData = () => {
  const [team, setTeam] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/football/delete', { team });
      alert('Data deleted successfully');
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
      <button type="submit">Delete Data</button>
    </form>
  );
};

export default DeleteData;
