// backend/controllers/userController.js

const User = require('../models/userModel'); // Assuming you have a UserModel defined

// Example controller functions

// Example function to register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Example function to fetch user details
exports.getUserDetails = async (req, res) => {
  const userId = req.params.userId; // Assuming userId is passed as a parameter

  try {
    // Fetch user details from MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add more controller functions as needed for user authentication, profile updates, etc.
