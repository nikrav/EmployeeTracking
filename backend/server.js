/* eslint-disable no-unused-vars */

//setup npm modules for use
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesHandler = require('./components/routes.js')

//set up express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cors lets me send data to the front end
app.use(cors());
//uses the routeHandler component from the routes.js fil, it handles all routes given to the server
app.use('/', routesHandler);

//start the server on this port
app.listen(5000, function(){
    console.log("Server is running on port 5000");
})