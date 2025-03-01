
const express = require('express');
const router = express.Router();
const thecontroller = require('../controllers/userControllers.js');

//Wrote this comment to committ his file

// Example route for testing
// router.get('/', (req, res) => {
//     res.send('Sign in!');
// });

//Routes for the controllers.
//Every route here is mounted onto app.use('/api/users-appone/...') in app.js

// router.get('/', thecontroller.getAllUsers);

// // "/:" allows the route to capture embedded values within the URL at that position
// router.get('/:id', thecontroller.getUserById);

//HTTP POST: Add to the database
router.post('/register', thecontroller.createUser);

// export your router
module.exports = router;