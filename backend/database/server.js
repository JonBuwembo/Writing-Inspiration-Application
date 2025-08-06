const path = require('path');

require('dotenv').config( {path: '../credentials.env'});
const fs = require('fs');
const dotenv = require('dotenv');
const express = require('express');
//Wrote this comment to committ his file
const userRoutes = require('../routes/userRoutes.js');
const app = require('../app.js');
//const port = process.env.SERVER_PORT;

app.use('/api/users-appone', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/auth/google/callback', (req, res) => {
  // Handle Google's response here
  const code = req.query.code;
  // Exchange code for tokens
  res.redirect('/'); // Redirect after auth
});

//start the server
// autonomously find available port for us
const server = app.listen(0, () => {
    const port = server.address().port;
    console.log(`Server for writing inspiration application is running on port ${port}`);
    // process.env.SERVER_PORT = port; <--changing port in memory not on file (not what we want
   
});


// handle errors
server.on('error', (err) => {
    console.error('Server error:', err);
});