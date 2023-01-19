/* eslint-disable no-unused-vars */

const express = require('express');
const router = express.Router();
const pool = require('./db.js');

//enter routes here
router.get("/", (req, res) =>{
    res.json({
        name: "Bill",
        age: 45
    })
    console.log("Request Made");
})

//exports our routes
module.exports = router;