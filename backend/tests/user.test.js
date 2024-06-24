// backend/tests/user.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'
const User = require('../models/userModel');

// Test user data
const testUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'testpassword'
};

// Jest hooks for setup and teardown
beforeAll(async () => {
  // Connect to a test database before running tests
  const mongoUrl = 'mongodb://localhost:27017/facebook-like-app-test'; // Using a separate test database
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

afterAll(async () => {
  // Disconnect Mongoose after all tests
  await mongoose.disconnect();
});

// Test suite for user-related operations
describe('User API Tests', () => {
  let authToken; // Store authentication token for tests

  // Register a new user before running tests
  beforeAll(async () => {
    await request(app)
      .post('/api/users/register')
      .send(testUser);
  });

  // Test case: User registration
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword'
      });

    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe('newuser');
    expect(response.body.user.email).toBe('newuser@example.com');
  });

  // Test case: Get user details
  it('should get user details', async () => {
    const registeredUser = await User.findOne({ email: testUser.email });

    const response = await request(app)
      .get(`/api/users/${registeredUser._id}`)
      .set('Authorization', `Bearer ${authToken}`); // Assuming authentication is implemented

    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe(testUser.username);
    expect(response.body.user.email).toBe(testUser.email);
  });

  // Add more test cases for other user operations (e.g., login, update profile)
});
