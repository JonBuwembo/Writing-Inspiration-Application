const axios = require('axios');

// Replace with the API URL you want to test
const apiUrl = 'https://catfact.ninja/fact';

async function testApiConnection() {
  try {
    console.log(`Connecting to API: ${apiUrl}`);
    
    // Make a GET request to the API
    const response = await axios.get(apiUrl);

    // Log the response status and data
    console.log('Connection successful!');
    console.log('Status Code:', response.status);
    console.log('Response Data:', response.data); 
  } catch (error) {
    console.error('Failed to connect to the API.');
    if (error.response) {
      // The request was made, and the server responded with a status code outside the 2xx range
      console.error('Status Code:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something else went wrong
      console.error('Error Message:', error.message);
    }
  }
}

testApiConnection();
