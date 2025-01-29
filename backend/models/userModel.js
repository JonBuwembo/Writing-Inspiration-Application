const pool = require('../database/database.js');

//Wrote this comment to committ his file
// const fetchAllUsers = async () => {
//     const result = await pool.query('SELECT * FROM users');
//     return result.rows;
// }

// const fetchUserById = async (id) => {
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     //return the first result
//     return result.rows[0]; 
// }

const createUser = async (userData) => {
    const {
        email,
        username,
        password,
        firstName,
        lastName
    } = userData;

    const bcrypt = require('bcrypt'); //bcrypt is now installed, was preventing database connection earlier.
    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        console.log("Inserting user into database:", { email, username, firstName, lastName });


        const result = await pool.query(
            'INSERT INTO users (email, username, password, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, username, hashedPassword, firstName, lastName]
        );

        //testing
        console.log('Database query successful:', result.rows[0]);
        
        //this will go back to the client!
        return result.rows[0];
        
    } catch (error) {

        //testing
        console.log('Database Error backend file [userModel.js]:', error.stack);
      
        throw error;
        
    }
   

}

//export your helper functions for querying the database
module.exports = {
    // fetchAllUsers,
    // fetchUserById,
    createUser,
};
