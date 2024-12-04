const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Connect to MongoDB
connectDB();

// Example route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import and use your routes
const footballRoutes = require('./routes/footballRoutes');
app.use('/api/football', footballRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// main code


// the between code have to be --- this is for summery. if i remove this there are no proplem is occured

app.get('/api/football/summary', async (req, res) => {
  try {
    const { team } = req.query; // Retrieve the team name from the query string
    if (!team) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    // Use case-insensitive regex to match the team
    const data = await Football.findOne({ team: { $regex: `^${team}$`, $options: 'i' } });

    // If no team data is found, return a 404 with a custom message
    if (!data) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Return the summary fields
    res.json({
      gamesPlayed: data.gamesPlayed,
      win: data.win,
      draw: data.draw,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary', details: err.message });
  }
});
