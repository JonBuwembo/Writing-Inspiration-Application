const pool = require('../database/server.js');

const fetchAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

const fetchUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    //return the first result
    return result.rows[0]; 
}

const createUser = async (userData) => {
    const {
        email,
        username,
        password,
        firstName,
        lastName
    } = userData;

    const result = await pool.query(
        'INSERT INTO users (email, username, password, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [email, username, password, firstName, lastName]
    );

    //this will go back to the client!
    return result.rows[0];
}

//export your helper functions for querying the database
module.exports = {
    fetchAllUsers,
    fetchUserById,
    createUser,
};
