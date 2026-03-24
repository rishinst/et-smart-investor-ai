// Opportunity Radar — Backend Server
// Serves signal data to the React frontend.

const express = require('express');
const cors = require('cors');
const signals = require('../data/mockStocks.json');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// GET /api/signals — returns all opportunity signals
app.get('/api/signals', (req, res) => {
  res.json(signals);
});

// GET /api/signals/:id — returns a single signal by ID
app.get('/api/signals/:id', (req, res) => {
  const signal = signals.find(s => s.id === parseInt(req.params.id));
  if (!signal) return res.status(404).json({ error: 'Signal not found' });
  res.json(signal);
});

app.listen(PORT, () => {
  console.log(`Opportunity Radar backend running on http://localhost:${PORT}`);
});
