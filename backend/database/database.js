const path = require('path');
require('dotenv').config( {path: path.resolve(__dirname, '../credentials.env')});
const { Pool } = require('pg');

const dotenv = require('dotenv');
const { release } = require('os');

const enviroPath = path.resolve(__dirname, './.env');
// Load the .env file
dotenv.config({ path: enviroPath });

//debugging
console.log(`database.js can read .env file user:${process.env.DB_USER} `);

//PostgreSQL connection pool setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// testing
// console.log('Database User:', 'jbuwedatacrafter99');

  
// Error handling
pool.connect((error, client, release) => {
    if (error) {
        console.error('!!----Unexpected error connecting to the database!----:  ', error);
    } else {
        console.log('Database connected successfully');
    }
    
    release();
});

// export module
module.exports = pool;