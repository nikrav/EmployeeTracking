/* eslint-disable no-unused-vars */

//setup npm modules for use
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./components/routes/employee_routes');
const journalRoutes = require('./components/routes/journal_routes');

//set up express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cors lets me send data to the front end
app.use(cors());
//uses the employeeRoutes and journalRoutes components, they handles all routes given to the server
app.use('/employees', employeeRoutes);
app.use('/journals', journalRoutes);

//start the server on this port
app.listen(5000, function(){
    console.log("Server is running on port 5000");
})