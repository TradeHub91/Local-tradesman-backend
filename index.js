require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // ← CORRECTED IMPORT (was 'express')
const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// Enhanced MongoDB Connection
// =====================
mongoose.connection.on('connecting', () => console.log('🔄 Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('✅ MongoDB Connected'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB Error:', err));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      authSource: 'admin'
    });
  } catch (err) {
    console.error('🔥 Fatal DB Error:', err.message);
    process.exit(1);
  }
};
connectDB();

// =====================
// Middleware
// =====================
app.use(express.json());

// =====================
// Routes
// =====================
app.get('/api/db-status', (req, res) => {
  res.json({
    status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    dbState: mongoose.connection.readyState,
    dbName: mongoose.connection.name // Added database name
  });
});

app.get('/', (req, res) => {
  res.send('🎉 Handy Hive Backend is Live!');
});

// =====================
// Server Start
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}/api/db-status`);
  console.log(`🔗 Live: https://handy-hive-backend.onrender.com/api/db-status`);
});

// =====================
// Graceful Shutdown
// =====================
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB Connection Closed');
  process.exit(0);
});
