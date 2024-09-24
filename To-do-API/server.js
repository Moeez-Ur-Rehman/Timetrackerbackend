// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'https://time-tracker-tc6d.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Only allow requests from origins in the list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Set to true if using cookies or authentication
};
/*const corsOptions = {
  origin: 'https://time-tracker-tc6d.vercel.app',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If your requests include credentials like cookies or HTTP authentication
};*/
// Enable CORS for all routes

dotenv.config();
const app = express();
app.use(cors(corsOptions))
app.options('*', cors());  // Preflight all routes

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
