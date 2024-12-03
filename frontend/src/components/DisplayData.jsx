import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayData = () => {
  const [records, setRecords] = useState([]);
  const [win, setWin] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/football/display?win=${win}`);
      setRecords(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [win]);

  return (
    <div>
      <input
        type="number"
        value={win}
        onChange={(e) => setWin(e.target.value)}
        placeholder="Enter minimum wins"
      />
      <button onClick={fetchData}>Fetch Data</button>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Games Played</th>
            <th>Win</th>
            <th>Draw</th>
            <th>Loss</th>
            <th>Goals For</th>
            <th>Goals Against</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.team}</td>
              <td>{record.gamesPlayed}</td>
              <td>{record.win}</td>
              <td>{record.draw}</td>
              <td>{record.loss}</td>
              <td>{record.goalsFor}</td>
              <td>{record.goalsAgainst}</td>
              <td>{record.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
