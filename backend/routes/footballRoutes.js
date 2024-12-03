const express = require('express');
const Football = require('../models/footballSchema');
const router = express.Router();

// Add Data
router.post('/add', async (req, res) => {
  try {
    const data = new Football(req.body);
    await data.save();
    res.status(201).send('Data added successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update Data
router.post('/update', async (req, res) => {
  try {
    const { team, updates } = req.body;
    await Football.updateOne({ team }, updates);
    res.send('Data updated successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete Data
router.post('/delete', async (req, res) => {
  try {
    const { team } = req.body;
    await Football.deleteOne({ team });
    res.send('Data deleted successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Display Records
router.get('/display', async (req, res) => {
  try {
    const data = await Football.find({ win: { $gt: req.query.win } }).limit(10);
    res.json(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;


// main code