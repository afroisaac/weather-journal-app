// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const PORT = 8080;
// Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express(); 
/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// Spin up the server

const server = app.listen(PORT, () => {
    console.log(`Server is currently running on port ${PORT}`);
});
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', (request, response) =>{
    response.send(projectData);
});
// Post Route
app.post('/saveData', (request, response) => {
    projectData = request.body;
});