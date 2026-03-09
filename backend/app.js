const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mykey';

const subnotesSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateCreated: { type: Date, default: Date.now }
});

// Schema structure for expenses
const notesSchema = new mongoose.Schema({
    name: String,
    content: [subnotesSchema],
    description: String,
    dateCreated: { type: Date, default: Date.now }
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    notes: [notesSchema]
})

// Database models for expenses and users
const Note = mongoose.model('Note', notesSchema);
const User = mongoose.model('User', userSchema);


// Middleware to authenticate token for protected routes
// Checks if the request has a valid JWT token in the Authorization header before allowing access to protected routes.
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Auth header received:', authHeader);  
    console.log('Token extracted:', token);

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // user data comes from payload.
    jwt.verify(token, SECRET_KEY, (err, userDecoded) => {

        console.log('Decoded token:', userDecoded);
        console.log('Token verification error:', err);
        if (err) {
            return res.sendStatus(403);
        }
        req.user = userDecoded;
        console.log("Authenticated user:", req.user);
        next();
    });
}

// login route
// using authenticateToken middleware, login is now protected, requires a valid token to access. 
// Only authenticated users can login.

app.post('/api/login', async (req, res) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log('User found during login:', user);

    if (!user) {
        // create the new user IF the username doesn't exist in the db
        const newUser = new User({ username, password, notes: [] });
        await newUser.save();

        const token = jwt.sign(
            { username: newUser.username },
            SECRET_KEY,
            { expiresIn: '75d' }
        );

        return res.json({ success: true, message: " Success! New user has been created!", token: token, username: newUser.username });
    }

    if (user.password !== password) {
        // 401 status code will be sent. I may change this.
        return res.status(401).json({error: "Invalid username or password"})
    }

    const token = jwt.sign(
        { username: user.username },
        SECRET_KEY,
        { expiresIn: '75d' }
    )

    return res.json({ message: "Login successful", token: token, username: user.username });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


