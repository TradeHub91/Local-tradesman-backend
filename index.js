require('dotenv').config(); // ✅ Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// =============================================
// MongoDB Connection
// =============================================

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

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
  } catch (err) {
    console.error('🔥 Fatal MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

connectDB();

// =============================================
// Middleware & Routes
// =============================================
app.use(express.json());

app.get('/api/db-status', (req, res) => {
  res.json({
    status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    dbState: mongoose.connection.readyState,
    dbName: mongoose.connection.name
  });
});

// Example route placeholder
app.get('/', (req, res) => {
  res.send('🎉 Handy Hive Backend is Live!');
});

// =============================================
// Start Server
// =============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}/api/db-status`);
  console.log(`🔗 Render: https://handy-hive-backend.onrender.com/api/db-status`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB Connection Closed');
  process.exit(0);
});
