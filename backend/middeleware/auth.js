const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Make sure path is correct

const auth = async (req, res, next) => {
  // console.log('Auth middleware triggered');
  
  // Get token from header
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ msg: 'No authorization header found' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: 'Invalid token payload' });
    }
    
    // Get user from database
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    
    
    // Add user info to request
    req.user = {
      id: decoded.id,
      name: user.name,
      phone: user.phone
    };
    
    next();
  } catch (err) {
    console.error('AUTH MIDDLEWARE ERROR:', err);
    console.error('Error stack:', err.stack);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token format' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    
    return res.status(401).json({ msg: 'Token verification failed' });
  }
};

module.exports = auth;