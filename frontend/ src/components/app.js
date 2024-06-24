// frontend/app.js

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');

  // Example: Fetch user data from backend API
  fetchUserData();
});

async function fetchUserData() {
  try {
    const response = await fetch('/api/users'); // Adjust the endpoint as per your API routes
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    console.log('User data:', userData);
    // Process and display user data in the frontend
    displayUserData(userData);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    // Handle error (e.g., display an error message to the user)
  }
}

function displayUserData(userData) {
  // Example: Display user data in the frontend
  const userContainer = document.getElementById('user-container');
  userData.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerHTML = `<p><strong>Username:</strong> ${user.username}</p>
                             <p><strong>Email:</strong> ${user.email}</p>`;
    userContainer.appendChild(userElement);
  });
}
