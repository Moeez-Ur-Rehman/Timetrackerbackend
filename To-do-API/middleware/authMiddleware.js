// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded JWT:', decoded); // Check if id is present
  
    if (!decoded.userId) {
      console.error('Decoded token does not contain an ID');
      return res.status(400).json({ message: 'Invalid token structure' });
    }
  
    const user = await User.findById(decoded.userId).select('-password');
   // console.log('User fetched from DB:', user); // Check if the user is found
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
