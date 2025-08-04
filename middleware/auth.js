const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User authentication middleware
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // userId is in decoded.userId
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Admin access only' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};
