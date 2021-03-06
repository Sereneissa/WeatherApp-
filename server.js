// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Setup Server
const port = 3000;

// Spin up the server

// Callback to debug
const server = app.listen(port,listening);

function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}

// Initialize the main project folder
app.use(express.static("App"));

//GET request
app.get("/all", (sendData));

function sendData(request, response) {
  console.log("HELLLOOOOO >>>", request, response, projectData);
  response.send(projectData);
}

//POST request 
app.post("/addAPI", (postData));
function postData(request, response) {
  const projectData = request.body;
  response.send({ message: "Post recieved" });
  console.log('I got a request');
  console.log(request.body);
  request.json({
    status:'success',
  });
} 


