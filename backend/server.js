/* eslint-disable no-unused-vars */

//setup npm modules for use
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//set up express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.json({
        name: "Bill",
        age: 45
    })
    console.log("Request Made");
})

app.listen(5000, function(){
    console.log("Server is running on port 5000");
})