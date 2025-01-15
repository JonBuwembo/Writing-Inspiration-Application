//THIS FILE: MAIN ENTRY POINT INTO FOR YOUR EXPRESS SERVER. Sets up middleware, defines routes, connects to database
//Wrote this comment to committ his file
require('dotenv').config({path: 'credentials.env'});

const express = require('express');
const path = require('path');

// Import database connection
const pool = require('./database/server');
// const mediaRoutes = require('./routes/media');
// const exp = require('constants');

const app = express();

// Middleware for parsing JSON files
app.use(express.json()); 

// pool connects to app for access in routers
app.locals.pool = pool;

// Import routes for use
const usersRoutes = require('./routes/userRoutes');

// userRoutes routing to database
app.use('/api/users-appone', usersRoutes);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for requests from http://localhost:5432
app.use(cors({ origin: 'http://localhost:5432'}));
// Middleware for parsing JSON file
app.use(express.json());


const PORT = process.env.DB_PORT || 5432;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// export the app
module.exports = app; 
