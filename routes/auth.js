const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User registered successfully' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password'});
    }

    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secure secret in production
    const userName = user.username;

    res.status(200).json({ message: 'Logged in successfully', token, userName });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error logging in user'});
  }
});

// Route to fetch all registered users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({});  // for testing
    res.json(users); // Send all users as a JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
module.exports = router;
