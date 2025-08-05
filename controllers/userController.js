const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password, address } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username, email, password: hashedPassword, address
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { username, email, address } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;

    await user.save();
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address
    });
  } catch (err) {
    next(err);
  }
};
