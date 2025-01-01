const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Serve static files from the "public" folder
app.use(serveStatic(path.join(__dirname, 'public')));

// Example route for testing
app.get('/', (req, res) => {
    res.send('Hello! Static files will be served here.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
