const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventory.routes');

// Load environment variables
dotenv.config();
// Connect to MongoDB
connectDB();
const app = express();


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/inventory', inventoryRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ success: false, data: null, error: err.message || 'Server error' });
});


// Start the server on the specified port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;



