// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware to parse incoming requests as JSON
app.use(express.json());

// MongoDB connection setup
const mongoURI = 'mongodb://localhost:27017/facebook-like-app'; // Replace with your MongoDB connection URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.log(err));

// Mount API routes
app.use('/api', apiRoutes);

// Default route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Facebook-like app API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export app for testing purposes
