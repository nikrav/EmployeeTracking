/* eslint-disable no-unused-vars */

const express = require('express');
const router = express.Router();
const pool = require('./db.js');

//enter routes here
router.get("/employees", async (req, res) => {
    console.log("Request Made");
    pool.getConnection( (err, con) => {
        if(err) throw err; //not connected
        //query the database
        con.query('SELECT * FROM employees', function (error, result, fields){
            //send the result in a json
            res.json(result)
        })
    })
})

//exports our routes
module.exports = router;