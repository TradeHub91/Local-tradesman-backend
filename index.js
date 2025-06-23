const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Essential middleware
app.use(express.json()); // For parsing JSON requests
// app.use(cors()); // Uncomment later if needed for frontend

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

// 404 Error handler (catches undefined routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Optional: Test log (visible in Render logs)
  console.log('Try these endpoints:');
  console.log(`http://localhost:${PORT}/api/tradesmen`);
});
