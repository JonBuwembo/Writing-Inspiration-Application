//THIS FILE: MAIN ENTRY POINT INTO FOR YOUR EXPRESS SERVER. Sets up middleware, defines routes, connects to database
//Wrote this comment to committ his file
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './database/.env')});

const express = require('express');


// Import database connection
const pool = require('./database/database.js');
// const mediaRoutes = require('./routes/media');
// const exp = require('constants');

const app = express();

app.use((err, req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    console.log(`Request Body:`, req.body);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error [app.js]' });
});

// Middleware for parsing JSON files
app.use(express.json()); 

const cors = require('cors');
app.use(cors());

// Enable CORS for requests from frontend url: http://localhost:5173
app.use(cors({ 
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Frontend url not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));

// pool connects to app for access in routers
app.locals.pool = pool;


// Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));

// Import routes for use
const usersRoutes = require('./routes/userRoutes.js');

// userRoutes routing to database
app.use('/api/users-appone', usersRoutes);

console.log(`${usersRoutes}`);


// // server connection, not database connection (not 5432)
// // const PORT = process.env.SERVER_PORT;
// const HOST = '127.0.0.1';

// // server finds an available port on its own
// const server = app.listen(0, () => {
//     const PORT = server.address().port;
//     console.log(`Server running on port ${HOST}:${PORT}`);
// });


// export the app
module.exports = app; 
