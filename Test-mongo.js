const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://conorjmurtagh:YellowTailDog@cluster0.195kzl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Successfully connected to MongoDB Atlas');
  process.exit(0);
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});
