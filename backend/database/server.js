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

//start the server
// autonomously find available port for us
const server = app.listen(0, () => {
    const port = server.address().port;
    console.log(`Server for writing inspiration application is running on port ${port}`);
    // process.env.SERVER_PORT = port; <--changing port in memory not on file (not what we want)
    const enviroPath = path.resolve(__dirname, './.env');

    // Load the .env file
    dotenv.config({ path: enviroPath });

    // debugging to see if .env file could be read in server.js
    console.log('----------------');
    console.log('server.js can read DB_USER: ', process.env.DB_USER);
    console.log('----------------');

    let serverportvar = ''; // this alone overwrites

    //read existing .env content if it exists.
    if(fs.existsSync(enviroPath)) {
        serverportvar = fs.readFileSync(enviroPath, 'utf8');
    }

    //debugging
    console.log('debugging: Attempting to write to path: ', enviroPath);

    //only change SERVER_PORT, no other!
    const updateSERVERPORT = serverportvar
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('SERVER_PORT='))
        .concat(`SERVER_PORT=${port}`)
        .join('\n');

    //debugging
    try {
        fs.writeFileSync(enviroPath, updateSERVERPORT, {encoding: 'utf8'});
        console.log(`Updated .env file`)
    } catch (error) {
        console.error('Failed tp update .env file:', error);
    }
    

    process.env.SERVER_PORT = port; // mow we can change this in memory for this runtime!
});


// handle errors
server.on('error', (err) => {
    console.error('Server error:', err);
});