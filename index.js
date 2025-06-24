const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// MongoDB Connection
// =====================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected successfully!");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// =====================
// Sample Data Store
// =====================
const tradesmen = [
  { id: 1, name: "Maria", trade: "Electrician", rating: 4.8 },
  { id: 2, name: "James", trade: "Plumber", rating: 4.5 }
];

// =====================
// Routes
// =====================
app.get('/', (req, res) => {
  res.send('Handy Hive Backend is running!');
});

app.get('/api/tradesmen', (req, res) => {
  res.json(tradesmen);
});

// =====================
// Error Handling
// =====================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// =====================
// Server Start
// =====================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log('🔗 Test endpoints:');
  console.log(`http://localhost:${PORT}/api/tradesmen`);
  console.log(`https://handy-hive-backend.onrender.com/api/tradesmen`);
});
