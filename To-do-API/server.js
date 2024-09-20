// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Enable CORS for all routes

dotenv.config();
const app = express();
app.use(cors())

// Other middleware and routes
//app.use(express.json());
//app.use('/api', require('./routes/user')); // Adjust based on your routes

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
// Define a root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
