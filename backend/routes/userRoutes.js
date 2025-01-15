
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userControllers.js');

// Example route for testing
app.get('/', (req, res) => {
    res.send('Sign in!');
});

//Routes for the controllers.
//Every route here is mounted onto app.use('/api/users-appone/...') in app.js

router.get('/', controller.getAllUsers);

// "/:" allows the route to capture embedded values within the URL at that position
router.get('/:id', controller.getUserById);

//HTTP POST: Add to the database
router.post('/register', controller.createUser);

// export your router
module.exports = router;