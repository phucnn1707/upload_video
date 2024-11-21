const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/connectDB');
const initWebRoutes = require('./src/routes/web');
const initApiRoutes = require('./src/routes/api');

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use('/public', express.static(path.join(__dirname, '../public')));

console.log(__dirname);

// Middleware
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Database connection
connectDB();

// Initialize web routes
initWebRoutes(app);

// Initialize api routes
initApiRoutes(app);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
