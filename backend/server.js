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
