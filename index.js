const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Essential middleware
app.use(express.json()); // For parsing JSON requests
// app.use(cors()); // Uncomment later if needed for frontend

// Routes
app.get('/', (req, res) => {
  res.send('Handy Hive Backend is running!');
});

app.get('/api/test', (req, res) => {
  res.json({ 
    status: "Success!",
    message: "API test route is working",
    timestamp: new Date().toISOString()
  });
});

// 404 Error handler (catches undefined routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
