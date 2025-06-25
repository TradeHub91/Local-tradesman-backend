const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// =============================================
// MongoDB Connection (Updated Secure Version)
// =============================================

// Connection events
mongoose.connection.on('connecting', () => {
  console.log('🔄 Connecting to MongoDB Atlas...');
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Atlas Connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB Disconnected');
});

// Connection configuration
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5s timeout
      maxPoolSize: 10 // Connection pool size
    });
  } catch (err) {
    console.error('🔥 Fatal MongoDB Connection Error:', err.message);
    process.exit(1); // Exit process on failure
  }
};

// Initialize connection
connectDB();

// =============================================
// Middleware and Routes
// =============================================
app.use(express.json());

// Test route to verify DB connection
app.get('/api/db-status', (req, res) => {
  res.json({
    status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    dbState: mongoose.connection.readyState,
    dbName: mongoose.connection.name
  });
});

// Your existing routes (tradesmen, etc.) go here...

// =============================================
// Server Startup
// =============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🔗 Test endpoints:');
  console.log(`http://localhost:${PORT}/api/db-status`);
  console.log(`https://handy-hive-backend.onrender.com/api/db-status`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB Connection Closed');
  process.exit(0);
});
