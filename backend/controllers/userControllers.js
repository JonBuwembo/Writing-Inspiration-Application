const express = require('express');
const router = express.Router();
const pool = require('../database/server.js');
const userModel = require('../models/userModel.js');
//Wrote this comment to committ his file

/*
        HTTP status codes:

        200 OK --> request successful
        201 Created --> request successful, new data/resource created
        202 Accepted --> request accepted for processing but incomplete
        
        404 Not Found --> Server cannot find the requested resource.
        500 Internal Server Error --> Server encountered an unexpected condition preventing request from being fulfilled.
        502 Bad Gateway --> Server recieved an invalid response from upstream.
        504 Gateway Timout --> Server did not recieve a timely response from upstream server.

*/ 


//those who have registered
const getAllUsers = async (req, res) => {

    try {
        const result = await userModel.fetchAllUsers();
        res.json(result.rows);
    } catch (err) { 
        console.error('Error: Query unable to be executed', err.stack);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};


// more routes to add that are user related, for example, ids
const createUser = async (req, res) => {

    try {
        //TODO: implement userModel and its functions
        const newUser = await userModel.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error: Query unable to be executed', err.stack);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const theUser = await userModel.fetchUserById(userId);
        //check if user exists or not
        if (user) {
            res.status(200).json(theUser);
        } else {
            res.status(404).json({error: 'User Not Found '});
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// export your functions
module.exports = {
    getUserById,
    getAllUsers,
    createUser,
};

// export routers
module.exports = router;