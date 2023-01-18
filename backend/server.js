/* eslint-disable no-unused-vars */

//setup npm modules for use
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

//set up express app
const app = express();
app.use(urlencoded({ extended: true }));

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})