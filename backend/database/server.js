require('dotenv').config( {path: '../credentials.env'});
const express = require('express');
const { Pool } = require('pg');
//Wrote this comment to committ his file

const app = require('../app');
const port = process.env.PORT || 5432;

//PostgreSQL connection pool setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

//Error handling
pool.on('error', (err) => {
    console.error('Error finding server!', err);
    process.exit(-1);
})

// export pool
module.exports = pool;

//start the server
app.listen(port, () => {
    console.log(`Server for writing inspiration application is running on port ${port}`);
});
