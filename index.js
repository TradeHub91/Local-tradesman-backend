const express = require('express');
const cors = require('cors');  // CORS package
const app = express();
const PORT = process.env.PORT || 3000;

// Essential middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json()); // For parsing JSON requests

// In-memory data store
const tradesmen = [
  { id: 1, name: "Maria", trade: "Electrician", rating: 4.8 },
  { id: 2, name: "James", trade: "Plumber", rating: 4.5 }
];

// Routes
app.get('/', (req, res) => {
  res.send('Handy Hive Backend is running!');
});

app.get('/api/tradesmen', (req, res) => {
  res.json(tradesmen);
});

// 404 Error handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Try these endpoints:');
  console.log(`http://localhost:${PORT}/api/tradesmen`);
});
